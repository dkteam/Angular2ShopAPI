import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageComponent } from './page.component';
import { PageRouter } from './page.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    PageRouter,
    ModalModule,
    FormsModule,
    CKEditorModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [PageComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService],
})
export class PageModule { }
