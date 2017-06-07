import { DraggableOptions } from '../model/draggable.options';
import { DragService } from '../services/drag.service';
export declare abstract class Draggable {
    protected dragService: DragService;
    protected _options: DraggableOptions;
    readonly options: DraggableOptions;
    private _model;
    model: any;
    readonly abstract nativeElement: HTMLElement;
    readonly parent: any;
    constructor(dragService: DragService);
    startDrag(event: DragEvent): void;
    endDrag(): void;
}
