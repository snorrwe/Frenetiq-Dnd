import { CoreOptions } from './core.options';

export interface ContainerOptions extends CoreOptions{
    areChildrenDraggable?: boolean
    isCloningDisabled?: boolean;
}

export const DefaultOptions: ContainerOptions = {
    areChildrenDraggable: true
}
