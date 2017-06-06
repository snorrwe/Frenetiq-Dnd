import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './example/hello/hello.component';

import { FrenetiqDnd } from '../core/ngx-frenetiq-dnd';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        FrenetiqDnd
    ],
    declarations: [
        AppComponent
        , HelloComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
