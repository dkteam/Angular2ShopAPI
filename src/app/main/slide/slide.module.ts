import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideComponent } from './slide.component';
import { SlideRouter } from './slide.routes';

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
    SlideRouter,
    ModalModule,
    FormsModule,
    CKEditorModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [SlideComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService],
})
export class SlideModule { }
