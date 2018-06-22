import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/services/upload.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.css']
})
export class SystemConfigComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  @ViewChild('slide') slide;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public systemConfigs: any[];
  public entity: any;
  public modalTitle: string='';

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService,
    private _utilityService: UtilityService,
    public _authenService: AuthenService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/systemConfig/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((respone: any) => {
        this.systemConfigs = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
      });
  }

  loadDetail(id: any) {
    this._dataService.get('/api/systemConfig/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddEditModal() {
    this.entity = {};
    this.modalTitle = "Thêm";
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadDetail(id);
    this.modalTitle = "Chỉnh sửa";
    this.modalAddEdit.show();
  }

  saveChanged(form: NgForm) {
    if (form) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/systemConfig/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/systemConfig/update', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }
  
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this.deleteItemConfirm(id)
    });
  }

  deleteItemConfirm(id: any) {
    this._dataService.del('/api/systemConfig/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }
}
