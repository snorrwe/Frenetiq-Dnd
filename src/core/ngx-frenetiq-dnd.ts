import { NgModule, ModuleWithProviders } from "@angular/core";

import { ContainerDirective } from './directives/container.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { DragService } from './services/drag.service';

@NgModule({
    declarations: [
        ContainerDirective
        , DraggableDirective
    ],
    providers: [
        DragService
    ],
    exports: [
        ContainerDirective
        , DraggableDirective
    ]
})
export class FrenetiqDnd { }
export { CoreOptions, DefaultOptions as DefaultCoreOptions } from './model/core.options';
export { ContainerOptions, DefaultOptions as DefaultContainerOptions } from './model/container.options';
export { DraggableOptions, DefaultOptions as DefaultDraggableOptions } from './model/draggable.options';
export { DragContainerPair } from './model/draggable-container.pair';
export { DragService };
