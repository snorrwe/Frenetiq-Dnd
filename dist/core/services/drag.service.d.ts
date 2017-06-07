import { Observable } from 'rxjs/Rx';
import { Draggable } from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';
import { DragContainerPair } from '../model/draggable-container.pair';
export declare class DragService {
    private current;
    private validContainers;
    private currentTarget;
    private onDragStartSubj;
    private onDragEndSubj;
    private onDropSubj;
    private onMissSubj;
    constructor();
    /**
    * Checks if any of the given key-value pairs is a valid container
    * Where key is the name of the container and value is if it is enabled
    */
    isContainerValid(containers: {
        key: string;
        value: boolean;
    }[]): boolean;
    /**
    * Fires an onDrop event with the passed parameters
    */
    drop(draggable: Draggable, container: ContainerDirective): void;
    /**
    * Updated the curren target container with the given container
    */
    enterDrag(container: ContainerDirective): void;
    /**
    * Removes the current target container
    */
    leaveDrag(): void;
    /**
    * Starts the drag process
    */
    startDrag(draggable: Draggable, validContainers?: {
        [key: string]: boolean;
    }): void;
    /**
    * Ends the drag process
    */
    endDrag(draggable: Draggable): void;
    /**
    * Fired when draggable is dropped on a container
    */
    onDrop(): Observable<DragContainerPair>;
    /**
    * Fired when the drag process begins
    */
    onDragStart(): Observable<Draggable>;
    /**
    * Fired when the drag process ends
    */
    onDragEnd(): Observable<Draggable>;
    /**
    * Fired when the drag process ends over no - or an invalid - container
    */
    onMiss(): Observable<Draggable>;
}
