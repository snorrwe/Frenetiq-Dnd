import { Draggable } from '../draggable.base';
import { ContainerDirective } from '../container.directive';
import { DragService } from '../../services/drag.service';

export class DraggableClone extends Draggable {

    private _nativeElement: HTMLElement;
    get nativeElement() { return this._nativeElement; }

    constructor(
        draggable: Draggable
        , service: DragService
        , readonly parent: ContainerDirective
    ) {
        super(service);
        this._options = draggable.options;
        this._nativeElement = draggable.nativeElement.cloneNode(true) as HTMLElement;
    }
}
