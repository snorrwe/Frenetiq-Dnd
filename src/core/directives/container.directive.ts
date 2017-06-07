import { ViewContainerRef, ComponentFactoryResolver, Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableDirective } from './draggable.directive';

import { ContainerOptions, DefaultOptions } from '../model/container.options';

class DraggableChild extends Draggable {

    constructor(
        service: DragService
        , readonly parent: ContainerDirective
        , readonly nativeElement: HTMLElement
    ) {
        super(service);
    }
}

@Directive({
    selector: '[frenetiq-container]'
    , exportAs: 'frenetiq-container'
})
export class ContainerDirective implements OnChanges, OnInit, OnDestroy {

    @Input("options") protected options: ContainerOptions;
    @Output("onDrop") protected onDropEmitter: EventEmitter<{ draggable: Draggable, container: ContainerDirective }>;

    protected isTarget: boolean;
    protected subscriptions: Subscription[];
    protected children: { model?: any, node: Node }[];

    protected get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        readonly elementRef: ElementRef
        , protected dragService: DragService
        , protected viewContainerRef: ViewContainerRef
        , protected componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.children = [];
        if (!this.options) this.options = DefaultOptions;
        this.onDropEmitter = new EventEmitter<{ draggable: Draggable, container: ContainerDirective }>();

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
        return  this.dragService
            .onDragEnd()
            .subscribe((draggable) => {
                if (draggable instanceof DraggableChild && draggable.parent === this) {
                    this.onChildDrop(draggable);
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

    @HostListener('dragenter')
    protected dragenter() {
        this.onDragEnter();
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
            let next = draggable.nativeElement.cloneNode(true);
            this.initClone(next, draggable.model);
        }
        this.dragService.drop(draggable, this);
        this.onDropEmitter.emit({ draggable: draggable, container: this });
    }

    private initClone(next: Node, model: any) {
        this.children.push({ node: next, model: model });
        let nextDraggable = new DraggableChild(this.dragService, this, next as HTMLElement);
        nextDraggable.model = next;
        (next as HTMLElement).ondragstart = () => nextDraggable.startDrag();
        (next as HTMLElement).ondragend = () => nextDraggable.endDrag();
        (next as HTMLElement).ondragenter = () => { this.dragenter(); }
        (next as HTMLElement).ondragleave = () => { this.dragleave(); }
        this.nativeElement.appendChild(next);
    }

    protected onChildDrop(draggable: DraggableChild) {
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

    protected onDragEnter() {
        let keys: string[];
        if (this.options && this.options.enabledContainers) {
            keys = Object.keys(this.options.enabledContainers);
        }
        if (this.dragService.isContainerValid(keys)) {
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
