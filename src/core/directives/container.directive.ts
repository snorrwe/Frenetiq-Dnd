import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableDirective } from './draggable.directive';

import { DefaultOptions as DraggableOptions } from '../model/draggable.options';
import { ContainerOptions, DefaultOptions as ContainerDefaultOptions } from '../model/container.options';
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

export enum DragEventType {
    Enter
    , Leave
}

@Directive({
    selector: '[frenetiq-container]'
    , exportAs: 'frenetiq-container'
})
export class ContainerDirective implements OnChanges, OnInit, OnDestroy {

    @Input("options") protected options: ContainerOptions;
    @Output("onDrop") protected onDropEmitter: EventEmitter<DragContainerPair>;

    protected isTarget: boolean;
    protected subscriptions: Subscription[];
    protected children: { model?: any, node: Node }[];
    protected eventQueue: { type: DragEventType, event: any }[];
    protected isLooping: boolean;

    get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        readonly elementRef: ElementRef
        , protected dragService: DragService
    ) {
        this.children = [];
        this.eventQueue = [];
        if (!this.options) this.options = ContainerDefaultOptions;
        this.onDropEmitter = new EventEmitter<DragContainerPair>();

        let onDragStartSub = this.subscribeToDragStart();
        let onDragEndSub = this.subscribeToDragEnd();
        this.subscriptions = [onDragStartSub, onDragEndSub];
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
        if (!this.options) this.options = ContainerDefaultOptions;
    }

    ngOnChanges() {
        if (!this.options) this.options = ContainerDefaultOptions;
    }

    ngOnDestroy() {
        this.subscriptions
            .forEach((sub) => {
                sub.unsubscribe();
            });
        this.isLooping = false;
    }

    protected startEventLoop() {
        this.isLooping = true;
        this.eventQueue = [];
        requestAnimationFrame(() => {
            this.eventLoop();
        });
    }

    private eventLoop() {
        if (this.eventQueue.length) {
            let lastEvent = this.eventQueue[this.eventQueue.length - 1]
            switch (lastEvent.type) {
                case DragEventType.Enter:
                    this.onDragOver(lastEvent.event);
                    break;
                case DragEventType.Leave:
                    this.onDragLeave();
                    break;
                default:
                    throw "Not implemented DragEventType!";
            }
        }

        this.eventQueue = [];

        if (this.isLooping) {
            setTimeout(() => { this.eventLoop() }, 50);
        }
    }

    @HostListener('dragover', ["$event"])
    protected dragover(event: DragEvent) {
        this.eventQueue.push({ type: DragEventType.Enter, event: event });
        if (!this.isLooping) {
            this.startEventLoop();
        }
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('dragenter', ["$event"])
    protected dragenter(event: DragEvent) {
        //This is required for dragover to work in IE
    }

    @HostListener('dragleave')
    protected dragleave() {
        this.eventQueue.push({ type: DragEventType.Leave, event: undefined });
        event.preventDefault();
        event.stopPropagation();
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
        clone.model = node;
        node.draggable = this.options.areChildrenDraggable;
        if (node.draggable) {
            node.ondragstart = (event) => clone.startDrag(event);
            node.ondragend = (event) => clone.endDrag(event);
        }
        this.children.push({ node: node, model: draggable.model });
        this.nativeElement.appendChild(node);
    }

    protected onChildDrop(draggable: DraggableClone) {
        if (!this.isTarget) {
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
    }

    protected onDragOver(event: DragEvent) {
        let keys: { key: string, value: boolean }[];
        if (this.options && this.options.enabledContainers) {
            let allKeys = Object.keys(this.options.enabledContainers);
            keys = allKeys
                .map((key) => {
                    return {
                        key: key
                        , value: this.options.enabledContainers[key]
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
        this.isLooping = false;
        this.isTarget = false;
        this.dragService.leaveDrag();
        this.nativeElement.classList.remove("fren-hover");
    }
}
