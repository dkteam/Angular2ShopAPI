import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionBatteryTerminalComponent } from './position-battery-terminal.component';
import { PositionBatteryTerminalRouter } from './position-battery-terminal.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';


@NgModule({
  imports: [
    CommonModule,
    PositionBatteryTerminalRouter,
    ModalModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [PositionBatteryTerminalComponent],
  
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class PositionBatteryTerminalModule { }
