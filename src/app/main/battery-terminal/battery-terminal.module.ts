import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryTerminalComponent } from './battery-terminal.component';
import { BatteryTerminalRouter } from './battery-terminal.routes';

import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    BatteryTerminalRouter,
    ModalModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [BatteryTerminalComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService]
})
export class BatteryTerminalModule { }
