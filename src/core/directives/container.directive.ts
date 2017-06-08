import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableDirective } from './draggable.directive';

import { ContainerOptions, DefaultOptions } from '../model/container.options';
import { DraggableOptions } from '../model/draggable.options';
import { DragContainerPair } from '../model/draggable-container.pair';

export class DraggableClone extends Draggable {

    private _nativeElement: HTMLElement;
    get nativeElement() { return this._nativeElement; }

    constructor(
        draggable: Draggable
        , service: DragService
        , readonly parent: ContainerDirective
    ) {
        super(service);
        this._options = draggable.options;
        this._nativeElement = draggable.nativeElement.cloneNode(true) as HTMLElement;
    }
}

@Directive({
    selector: '[frenetiq-container]'
    , exportAs: 'frenetiq-container'
})
export class ContainerDirective implements OnChanges, OnInit, OnDestroy {

    @Input("options") protected options: ContainerOptions;
    @Output("onDrop") protected onDropEmitter: EventEmitter<DragContainerPair>;
    @Output("onChildDrop") protected onChildDropEmitter: EventEmitter<DragContainerPair>;

    protected isTarget: boolean;
    protected subscriptions: Subscription[];
    protected children: { model?: any, node: Node }[];

    get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        readonly elementRef: ElementRef
        , protected dragService: DragService
    ) {
        this.children = [];
        if (!this.options) this.options = DefaultOptions;
        this.onDropEmitter = new EventEmitter<DragContainerPair>();
        this.onChildDropEmitter = new EventEmitter<DragContainerPair>();

        this.subscriptions = [
            this.subscribeToDragStart()
            , this.subscribeToDragEnd()
        ];
    }

    private subscribeToDragStart() {
        return this.dragService
            .onDragStart()
            .subscribe((draggable) => { });
    }

    private subscribeToDragEnd() {
        return this.dragService
            .onDragEnd()
            .subscribe((draggable) => {
                if (draggable.parent === this) {
                    this.onChildDrop(draggable as DraggableClone);
                } else if (this.isTarget && !this.options.isDisabled) {
                    this.onDrop(draggable);
                }
            });
    }

    ngOnInit() {
        if (!this.options) this.options = DefaultOptions;
    }

    ngOnChanges() {
        if (!this.options) this.options = DefaultOptions;
    }

    ngOnDestroy() {
        this.subscriptions
            .forEach((sub) => {
                sub.unsubscribe();
            });
    }

    @HostListener('dragover', ["$event"])
    protected dragover(event: DragEvent) {
        this.onDragOver(event);
    }

    @HostListener('dragleave')
    protected dragleave() {
        requestAnimationFrame(() => {
            this.onDragLeave();
        });
    }

    protected onDrop(draggable: Draggable) {
        if (!draggable) {
            console.warn("onDrop called without draggable!");
            return;
        }
        if (!this.options.isCloningDisabled) {
            this.initClone(draggable);
        }
        this.dragleave();
        this.dragService.drop(draggable, this);
        this.onDropEmitter.emit({ draggable: draggable, container: this });
    }

    private initClone(draggable: Draggable) {
        let clone = new DraggableClone(draggable, this.dragService, this);
        let node = clone.nativeElement;
        clone.dragModel = node;
        node.draggable = this.options.areChildrenDraggable;
        if (node.draggable) {
            node.ondragstart = (event) => clone.startDrag(event);
            node.ondragend = () => clone.endDrag();
        }
        this.children.push({ node: node, model: draggable.dragModel });
        this.nativeElement.appendChild(node);
    }

    protected onChildDrop(draggable: DraggableClone) {
        if (!this.isTarget && this.options.removeDroppedChildren){
            let childIndex: number;
            let child = this.children.find((item, index) => {
                childIndex = index;
                let result = item.node === draggable.nativeElement;
                return result;
            });
            if (child) {
                this.children.splice(childIndex, 1);
                this.nativeElement.removeChild(child.node);
            }
        }
        this.onChildDropEmitter.emit({draggable: draggable, container: this});
    }

    protected onDragOver(event: DragEvent) {
        let keys: { key: string, value: boolean }[];
        if (this.options && this.options.containerTags) {
            let allKeys = Object.keys(this.options.containerTags);
            keys = allKeys
                .map((key) => {
                    return {
                        key: key
                        , value: this.options.containerTags[key]
                    }
                });
        }
        if (this.dragService.isContainerValid(keys)) {
            event.preventDefault();
            this.isTarget = true;
            this.dragService.enterDrag(this);
            this.nativeElement.classList.add("fren-hover");
        }
    }

    protected onDragLeave() {
        this.isTarget = false;
        this.dragService.leaveDrag();
        this.nativeElement.classList.remove("fren-hover");
    }
}
