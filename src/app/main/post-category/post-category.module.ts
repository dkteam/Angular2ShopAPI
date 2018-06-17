import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostCategoryComponent } from './post-category.component';
import { PostCategoryRouter } from './post-category.routes';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    PostCategoryRouter,
    ModalModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [PostCategoryComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService],
})
export class PostCategoryModule { }
