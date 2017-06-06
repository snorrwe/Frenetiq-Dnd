import { Observable } from 'rxjs/Rx';
import { Draggable } from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';
export declare class DragService {
    private current;
    private onDragStartSubj;
    private onDragEndSubj;
    private onDropSubj;
    constructor();
    drop(draggable: Draggable, container: ContainerDirective): void;
    startDrag(draggable: Draggable): void;
    endDrag(draggable: Draggable): void;
    onDrop(): Observable<{
        draggable: Draggable;
        container: ContainerDirective;
    }>;
    onDragStart(): Observable<Draggable>;
    onDragEnd(): Observable<Draggable>;
}
