import { Type, ViewContainerRef, Directive, Input, EventEmitter, Output, ElementRef, HostListener, OnInit, OnChanges } from '@angular/core';

import { DragService } from '../services/drag.service';
import { DefaultOptions, DraggableOptions } from '../model/draggable.options';
import { Draggable } from './draggable.base';

@Directive({
	selector: '[frenetiq-draggable]'
	, exportAs: 'frenetiq-draggable'
})
export class DraggableDirective extends Draggable implements OnInit, OnChanges {

	@Input("options") protected options: DraggableOptions;
    @Input("drag-model") readonly model: any;
    @Output("onDragStart") protected onDragStartEmitter: EventEmitter<Draggable>;
    @Output("onDragEnd") protected onDragEndEmitter: EventEmitter<Draggable>;
    @Input("parent") readonly parent: any;

	get nativeElement(): HTMLElement {
		return this.elementRef.nativeElement;
	}

	constructor(
		readonly elementRef: ElementRef
		, readonly viewContainer: ViewContainerRef
		, dragService: DragService
	) {
        super(dragService);
	    this.onDragStartEmitter = new EventEmitter<Draggable>();
        this.onDragEndEmitter = new EventEmitter<Draggable>();
		if (!this.options) this.options = DefaultOptions;
	}

	ngOnInit() {
		if (!this.options) this.options = DefaultOptions;
		this.elementRef.nativeElement.draggable = !this.options.isDisabled;
		(this.elementRef.nativeElement as HTMLElement).style.display = "block";
	}

	ngOnChanges() {
		if (!this.options) this.options = DefaultOptions;
		this.elementRef.nativeElement.draggable = !this.options.isDisabled;
	}

	@HostListener("dragstart")
	startDrag() {
        super.startDrag();
	    this.onDragStartEmitter.emit(this);
	}

	@HostListener("dragend")
	endDrag() {
        super.endDrag();
        this.onDragEndEmitter.emit(this);
	}
} 
