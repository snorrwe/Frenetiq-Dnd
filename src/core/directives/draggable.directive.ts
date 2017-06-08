import { Type, ViewContainerRef, Directive, Input, EventEmitter, Output, ElementRef, HostListener, OnInit, OnChanges } from '@angular/core';

import { DragService } from '../services/drag.service';
import { DefaultOptions, DraggableOptions } from '../model/draggable.options';
import { Draggable } from './draggable.base';

@Directive({
	selector: '[frenetiq-draggable]'
	, exportAs: 'frenetiq-draggable'
})
export class DraggableDirective extends Draggable implements OnInit, OnChanges {

	@Input("options") protected _options: DraggableOptions;
    @Input("drag-model") readonly model: any;
    @Input("parent") readonly parent: any;
    @Output("onDragStart") protected onDragStartEmitter: EventEmitter<Draggable>;
    @Output("onDragEnd") protected onDragEndEmitter: EventEmitter<Draggable>;

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
		if (!this._options) this._options = DefaultOptions;
	}

	ngOnInit() {
		if (!this._options) this._options = DefaultOptions;
		this.elementRef.nativeElement.draggable = !this._options.isDisabled;
		(this.elementRef.nativeElement as HTMLElement).style.display = "block";
	}

	ngOnChanges() {
		if (!this._options) this._options = DefaultOptions;
		this.elementRef.nativeElement.draggable = !this._options.isDisabled;
	}

	@HostListener("dragstart", ["$event"])
    startDrag(event: DragEvent) {
        super.startDrag(event);
	    this.onDragStartEmitter.emit(this);
	}

	@HostListener("dragend")
	endDrag() {
        super.endDrag();
        this.onDragEndEmitter.emit(this);
	}
} 
