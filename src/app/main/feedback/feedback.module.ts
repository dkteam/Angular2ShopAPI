import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackComponent } from './feedback.component';
import { FeedbackRouter } from './feedback.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule,
    FeedbackRouter,
    ModalModule.forRoot()
  ],
  declarations: [FeedbackComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class FeedbackModule { }
