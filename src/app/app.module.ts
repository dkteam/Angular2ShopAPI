import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';

//import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ngx-ckeditor';

import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
// import { BatteryTerminalComponent } from './battery-terminal/battery-terminal.component';

// import {GoogleAnalyticsEventsService} from "./core/services/google-analytics-events.service";
// import { NgxSelectModule,INgxSelectOptions } from 'ngx-select-ex';
// const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
//   optionValueField: 'ID',
//   optionTextField: 'Name'
// };

@NgModule({
  declarations: [
    AppComponent,
    // BatteryTerminalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    CKEditorModule,
    BrowserAnimationsModule,
    // NgxSelectModule.forRoot(CustomSelectOptions),
    NgProgressModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [AuthGuard,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
