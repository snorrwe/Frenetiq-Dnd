import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import {Draggable} from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';

@Injectable()
export class DragService {

	private current: Draggable;

	private onDragStartSubj: Subject<Draggable>;
	private onDragEndSubj: Subject<Draggable>;
	private onDropSubj: Subject<{ draggable: Draggable, container: ContainerDirective }>;

	constructor() {
		this.onDragStartSubj = new Subject<Draggable>();
		this.onDragEndSubj = new Subject<Draggable>();
		this.onDropSubj = new Subject<{ draggable: Draggable, container: ContainerDirective }>();
	}

	drop(draggable: Draggable, container: ContainerDirective) {
		this.onDropSubj.next({ draggable: draggable, container: container });
	}

	startDrag(draggable: Draggable) {
		this.current = draggable;
		this.onDragStartSubj.next(draggable);
	}

	endDrag(draggable: Draggable) {
		delete this.current;
		this.onDragEndSubj.next(draggable);
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
}
