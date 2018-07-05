import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRequestComponent } from './price-request.component';
import { PriceRequestRouter } from './price-request.routes';

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
    PriceRequestRouter,
    ModalModule.forRoot()
  ],
  declarations: [PriceRequestComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class PriceRequestModule { }
