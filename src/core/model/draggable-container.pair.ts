import { Draggable } from '../directives/draggable.base';
import { ContainerBase } from '../directives/container.base';

export interface DragContainerPair {
	draggable: Draggable;
	container: ContainerBase;
}
