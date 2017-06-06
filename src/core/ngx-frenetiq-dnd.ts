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
export class FrenetiqDnd {}
