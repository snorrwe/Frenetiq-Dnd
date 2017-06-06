import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DraggableDirective } from './core/directives/draggable.directive';
import { ContainerDirective } from './core/directives/container.directive';
import { DragService } from './core/services/drag.service';

import { HelloComponent } from './example/hello/hello.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent
        , DraggableDirective
        , ContainerDirective
        , HelloComponent
    ],
    providers: [
        DragService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
