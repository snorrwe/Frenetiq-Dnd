import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DragEventType } from './container.directive';
import { DefaultOptions as DraggableOptions } from '../model/draggable.options';
import { ContainerOptions, DefaultOptions as ContainerDefaultOptions } from '../model/container.options';
import { DragContainerPair } from '../model/draggable-container.pair';

import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableDirective } from './draggable.directive';
import { DraggableClone } from './container/draggable-clone';

export abstract class ContainerBase {
    get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    protected options: ContainerOptions;
    protected isTarget: boolean;
    protected subscriptions: Subscription[];
    protected children: { model?: any, node: Node }[];
    protected eventQueue: { type: DragEventType, event: any }[];
    protected isLooping: boolean;

    protected abstract onDrop(draggable: Draggable);

    constructor(readonly elementRef: ElementRef, protected dragService: DragService) { }

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
