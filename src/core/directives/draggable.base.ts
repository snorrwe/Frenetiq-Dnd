import { DraggableDefaultOptions, DraggableOptions } from '../ngx-frenetiq-dnd';
import { DragService } from '../services/drag.service';
import { ContainerDirective } from './container.directive';

export abstract class Draggable {
    protected _options: DraggableOptions;
    get options() { return this._options; }

    private _model: any;
    get model() { return this._model; }
    set model(value) { this._model = value; }

    abstract get nativeElement(): HTMLElement;
    readonly parent: any;

    constructor(protected dragService: DragService) {
        if (!this._options) this._options = DraggableDefaultOptions;
    }

    startDrag(event: DragEvent) {
        if (this.nativeElement) {
            this.nativeElement.classList.add("fren-dragging");
        }
        this.dragService.startDrag(this, this._options.enabledContainers);
    }

    endDrag(event: DragEvent) {
        event.cancelBubble = true;
        if (this.nativeElement) {
            this.nativeElement.classList.remove("fren-dragging");
        }
        this.dragService.endDrag(this);
    }
}
