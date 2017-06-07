import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { Draggable } from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';

@Injectable()
export class DragService {

    private current: Draggable;
    private validContainers: { [key: string]: boolean }
    private currentTarget: ContainerDirective;

    private onDragStartSubj: Subject<Draggable>;
    private onDragEndSubj: Subject<Draggable>;
    private onDropSubj: Subject<{ draggable: Draggable, container: ContainerDirective }>;
    private onMissSubj: Subject<Draggable>;

    constructor() {
        this.onDragStartSubj = new Subject<Draggable>();
        this.onDragEndSubj = new Subject<Draggable>();
        this.onMissSubj = new Subject<Draggable>();
        this.onDropSubj = new Subject<{ draggable: Draggable, container: ContainerDirective }>();
    }

    drop(draggable: Draggable, container: ContainerDirective) {
        this.onDropSubj.next({ draggable: draggable, container: container });
    }

    isContainerValid(containers: string[]) {
        if (!containers || !containers.length) {
            return true;
        }
        for (let container of containers) {
            if (this.validContainers[container]) {
                return true;
            }
        }
        return false;
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

    onDrop(): Observable<{ draggable: Draggable, container: ContainerDirective }> {
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
