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
import { NgProgressModule,NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    CKEditorModule,
    BrowserAnimationsModule,
    NgProgressModule
  ],
  providers: [AuthGuard, 
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
