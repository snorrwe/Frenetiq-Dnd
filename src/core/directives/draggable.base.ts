import { DefaultOptions, DraggableOptions } from '../model/draggable.options';
import { DragService } from '../services/drag.service';
import { ContainerDirective } from './container.directive';

export abstract class Draggable {
    protected _options: DraggableOptions;
    get options() { return this._options; }

    private _model: any;
    get dragModel() { return this._model; }
    set dragModel(value) { this._model = value; }

    abstract get nativeElement(): HTMLElement;
    readonly parent: any;

    constructor(protected dragService: DragService) {
        if (!this._options) this._options = DefaultOptions;
    }

    startDrag(event: DragEvent) {
        if (this.nativeElement) {
            this.nativeElement.classList.add("fren-dragging");
        }
        this.dragService.startDrag(this, this._options.containerTags);
    }

    endDrag() {
        if (this.nativeElement) {
            this.nativeElement.classList.remove("fren-dragging");
        }
        this.dragService.endDrag(this);
    }
}
