import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemConfigComponent } from './system-config.component';
import { SystemConfigRouter } from './system-config.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    SystemConfigRouter,
    ModalModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [SystemConfigComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService],
})
export class SystemConfigModule { }
