import { Type, ViewContainerRef, Directive, Input, EventEmitter, Output, ElementRef, HostListener, OnInit, OnChanges } from '@angular/core';

import { DragService } from '../services/drag.service';
import { Draggable } from './draggable.base';
import { DraggableDefaultOptions, DraggableOptions } from '../ngx-frenetiq-dnd';

@Directive({
	selector: '[frenetiq-draggable]'
	, exportAs: 'frenetiq-draggable'
})
export class DraggableDirective extends Draggable implements OnInit, OnChanges {

	@Input("options") protected _options: DraggableOptions;
    @Input("dragModel") readonly model: any;
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
        if (!this._options) this._options = DraggableDefaultOptions;
	}

	ngOnInit() {
        if (!this._options) this._options = DraggableDefaultOptions;
		this.elementRef.nativeElement.draggable = !this._options.isDisabled;
	}

	ngOnChanges() {
        if (!this._options) this._options = DraggableDefaultOptions;
		this.elementRef.nativeElement.draggable = !this._options.isDisabled;
	}

	@HostListener("dragstart", ["$event"])
    startDrag(event: DragEvent) {
        event.cancelBubble = true;
        super.startDrag(event);
	    this.onDragStartEmitter.emit(this);
	}

	@HostListener("dragend", ["$event"])
    endDrag(event: DragEvent) {
        super.endDrag(event);
        this.onDragEndEmitter.emit(this);
	}
} 
