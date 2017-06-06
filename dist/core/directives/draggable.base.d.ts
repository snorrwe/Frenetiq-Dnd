import { DraggableOptions } from '../model/draggable.options';
import { DragService } from '../services/drag.service';
export declare class Draggable {
    protected dragService: DragService;
    protected options: DraggableOptions;
    private _model;
    model: any;
    readonly nativeElement: HTMLElement;
    constructor(dragService: DragService);
    startDrag(): void;
    endDrag(): void;
}
