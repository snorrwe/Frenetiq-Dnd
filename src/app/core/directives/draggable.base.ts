import { DefaultOptions, DraggableOptions } from '../model/draggable.options';
import { DragService } from '../services/drag.service';

export class Draggable {
	protected options: DraggableOptions;

	private _model: any;
	get model() { return this._model; }
	set model(value) { this._model = value; }

	readonly nativeElement: HTMLElement;

	constructor(protected dragService: DragService) {
		if (!this.options) this.options = DefaultOptions;
	}

	startDrag() {
		this.dragService.startDrag(this);
	}

	endDrag() {
		this.dragService.endDrag(this);
	}
}
