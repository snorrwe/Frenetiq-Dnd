import { ViewContainerRef, ElementRef, OnInit, OnChanges } from '@angular/core';
import { DragService } from '../services/drag.service';
import { DraggableOptions } from '../model/draggable.options';
import { Draggable } from './draggable.base';
export declare class DraggableDirective extends Draggable implements OnInit, OnChanges {
    readonly elementRef: ElementRef;
    readonly viewContainer: ViewContainerRef;
    protected options: DraggableOptions;
    readonly model: any;
    readonly nativeElement: HTMLElement;
    constructor(elementRef: ElementRef, viewContainer: ViewContainerRef, dragService: DragService);
    ngOnInit(): void;
    ngOnChanges(): void;
    startDrag(): void;
    endDrag(): void;
}
