import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuRouter } from './menu.routes';

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
    FormsModule,
    PaginationModule,
    ModalModule,
    MenuRouter,
    NgxSelectModule.forRoot(CustomSelectOptions),
    ModalModule.forRoot()
  ],
  declarations: [MenuComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class MenuModule { }
