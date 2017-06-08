import { CoreOptions } from './core.options';

export interface ContainerOptions extends CoreOptions{
    areChildrenDraggable?: boolean;
    isCloningDisabled?: boolean;
    removeDroppedChildren?: boolean;
}

export const DefaultOptions: ContainerOptions = {
    areChildrenDraggable: true
}
