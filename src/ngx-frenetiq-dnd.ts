import { NgModule, ModuleWithProviders } from "@angular/core";

import { ContainerDirective } from './app/core/directives/container.directive';
import { DraggableDirective } from './app/core/directives/draggable.directive';
import { DragService } from './app/core/services/drag.service';

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
