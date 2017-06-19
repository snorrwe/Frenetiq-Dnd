import { ViewContainerRef, EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableOptions } from '../ngx-frenetiq-dnd';
export declare class DraggableDirective extends Draggable implements OnInit, OnChanges {
    readonly elementRef: ElementRef;
    readonly viewContainer: ViewContainerRef;
    protected _options: DraggableOptions;
    readonly model: any;
    protected onDragStartEmitter: EventEmitter<Draggable>;
    protected onDragEndEmitter: EventEmitter<Draggable>;
    readonly parent: any;
    readonly nativeElement: HTMLElement;
    constructor(elementRef: ElementRef, viewContainer: ViewContainerRef, dragService: DragService);
    ngOnInit(): void;
    ngOnChanges(): void;
    startDrag(event: DragEvent): void;
    endDrag(event: DragEvent): void;
}
