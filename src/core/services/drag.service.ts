import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { Draggable } from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';
import { DragContainerPair } from '../model/draggable-container.pair';

@Injectable()
export class DragService {

    private current: Draggable;
    private validContainers: { [key: string]: boolean }
    private currentTarget: ContainerDirective;

    private onDragStartSubj: Subject<Draggable>;
    private onDragEndSubj: Subject<Draggable>;
    private onDropSubj: Subject<DragContainerPair>;
    private onMissSubj: Subject<Draggable>;

    constructor() {
        this.onDragStartSubj = new Subject<Draggable>();
        this.onDragEndSubj = new Subject<Draggable>();
        this.onMissSubj = new Subject<Draggable>();
        this.onDropSubj = new Subject<DragContainerPair>();
    }

    /**
    * Checks if any of the given key-value pairs is a valid container
    * Where key is the name of the container and value is if it is enabled
    */
    isContainerValid(containers: { key: string, value: boolean }[]) {
        if (!containers || !containers.length) {
            return true;
        }
        for (let container of containers) {
            if (container.value && this.validContainers[container.key]) {
                return true;
            }
        }
        return false;
    }

    /**
    * Fires an onDrop event with the passed parameters
    */
    drop(draggable: Draggable, container: ContainerDirective) {
        this.onDropSubj.next({ draggable: draggable, container: container });
    }

    /**
    * Updates the current target container with the given container
    */
    enterDrag(container: ContainerDirective) {
        this.currentTarget = container;
    }

    /**
    * Removes the current target container
    */
    leaveDrag() {
        this.currentTarget = null;
    }

    /**
    * Starts the drag process
    */
    startDrag(draggable: Draggable, validContainers?: { [key: string]: boolean }) {
        this.current = draggable;
        this.validContainers = validContainers || {}
        this.onDragStartSubj.next(draggable);
    }

    /**
    * Ends the drag process
    */
    endDrag(draggable: Draggable) {
        this.onDragEndSubj.next(draggable);
        if (!this.currentTarget) {
            this.onMissSubj.next(draggable);
        }
        delete this.current;
        delete this.currentTarget;
    }

    /**
    * Fired when draggable is dropped on a container
    */
    onDrop(): Observable<DragContainerPair> {
        return this.onDropSubj.asObservable();
    }

    /**
    * Fired when the drag process begins
    */
    onDragStart(): Observable<Draggable> {
        return this.onDragStartSubj.asObservable();
    }

    /**
    * Fired when the drag process ends
    */
    onDragEnd(): Observable<Draggable> {
        return this.onDragEndSubj.asObservable();
    }

    /**
    * Fired when the drag process ends over no - or an invalid - container
    */
    onMiss(): Observable<Draggable> {
        return this.onMissSubj.asObservable();
    }
}
