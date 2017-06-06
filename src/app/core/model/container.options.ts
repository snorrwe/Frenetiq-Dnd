import { CoreOptions } from './core.options';

export interface ContainerOptions extends CoreOptions{
	areChildrenDraggable?: boolean
}

export const DefaultOptions: ContainerOptions = {
	isDisabled: false
	, areChildrenDraggable: true
}
