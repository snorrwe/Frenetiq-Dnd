import { Draggable } from '../directives/draggable.base';
import { ContainerDirective } from '../directives/container.directive';

export interface DragContainerPair {
	draggable: Draggable;
	container: ContainerDirective;
}
