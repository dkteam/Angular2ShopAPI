import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarLineComponent } from './car-line.component';
import { CarLineRouter } from './car-line.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

import { NgxSelectModule,INgxSelectOptions } from 'ngx-select-ex';
const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'ID',
  optionTextField: 'Name'
};

@NgModule({
  imports: [
    CommonModule,
    CarLineRouter,
    ModalModule,
    FormsModule,
    PaginationModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    ModalModule.forRoot()
  ],
  declarations: [CarLineComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class CarLineModule { }
