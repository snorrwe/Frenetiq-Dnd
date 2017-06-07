import { DefaultOptions, DraggableOptions } from '../model/draggable.options';
import { DragService } from '../services/drag.service';
import { ContainerDirective } from './container.directive';

export abstract class Draggable {
    protected options: DraggableOptions;

    private _model: any;
    get model() { return this._model; }
    set model(value) { this._model = value; }

    readonly nativeElement: HTMLElement;
    readonly parent: any;

    constructor(protected dragService: DragService) {
        if (!this.options) this.options = DefaultOptions;
    }

    startDrag(event: DragEvent) {
        if (this.nativeElement) {
            this.nativeElement.classList.add("fren-dragging");
        }
        this.dragService.startDrag(this, this.options.enabledContainers);
    }

    endDrag() {
        if (this.nativeElement) {
            this.nativeElement.classList.remove("fren-dragging");
        }
        this.dragService.endDrag(this);
    }
}
