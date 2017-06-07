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

    drop(draggable: Draggable, container: ContainerDirective) {
        this.onDropSubj.next({ draggable: draggable, container: container });
    }

    enterDrag(container: ContainerDirective) {
        this.currentTarget = container;
    }

    leaveDrag() {
        this.currentTarget = null;
    }

    startDrag(draggable: Draggable, validContainers?: { [key: string]: boolean }) {
        this.validContainers = validContainers
        this.current = draggable;
        this.onDragStartSubj.next(draggable);
    }

    endDrag(draggable: Draggable) {
        this.onDragEndSubj.next(draggable);
        if (!this.currentTarget) {
            this.onMissSubj.next(draggable);
        }
        delete this.current;
        delete this.currentTarget;
    }

    onDrop(): Observable<DragContainerPair> {
        return this.onDropSubj.asObservable();
    }

    onDragStart(): Observable<Draggable> {
        return this.onDragStartSubj.asObservable();
    }

    onDragEnd(): Observable<Draggable> {
        return this.onDragEndSubj.asObservable();
    }

    onMiss(): Observable<Draggable> {
        return this.onMissSubj.asObservable();
    }
}
