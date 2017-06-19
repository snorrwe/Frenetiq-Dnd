import { DraggableOptions } from '../ngx-frenetiq-dnd';
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
    endDrag(event: DragEvent): void;
}
