import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandComponent } from './brand.component';
import { BrandRouter } from './brand.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    BrandRouter,
    ModalModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilityService, NotificationService, UploadService],
  declarations: [BrandComponent]
})
export class BrandModule { }
