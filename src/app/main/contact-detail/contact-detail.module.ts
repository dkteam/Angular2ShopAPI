import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDetailComponent } from './contact-detail.component';
import { ContactDetailRouter } from './contact-detail.routes';

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
    ContactDetailRouter,
    ModalModule,
    FormsModule,
    CKEditorModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [ContactDetailComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class ContactDetailModule { }
