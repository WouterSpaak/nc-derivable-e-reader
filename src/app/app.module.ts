import { ReactiveFormsModule } from '@angular/forms';
import { NgxSherlockModule } from 'ngx-sherlock';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ViewerComponent } from './viewer/viewer.component';
import { UtilsService } from './utils.service';

@NgModule({
    declarations: [
        AppComponent,
        NavigatorComponent,
        ViewerComponent
    ],
    imports: [
        BrowserModule,
        NgxSherlockModule,
        ReactiveFormsModule,
    ],
    providers: [UtilsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
