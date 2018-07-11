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
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public origins: any[];
  public entity: any;
  public modalTitle: string = '';
  public deleteButtonFlag: boolean = true;
  public checkedItems: any[];

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService,
    private _utilityService: UtilityService,
    public _authenService: AuthenService
  ) {
    if (_authenService.checkAccess('USER') == false) {
      _utilityService.navigateToLogin();
    }
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/origin/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((respone: any) => {
        this.origins = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
      }, error => this._dataService.handleError(error));
  }

  loadOrigin(id: any) {
    this._dataService.get('/api/origin/detail/' + id)
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
    this.loadOrigin(id);
    this.modalTitle = "Chỉnh sửa";
    this.modalAddEdit.show();
  }

  saveChanged(valid: boolean) {
    if (valid) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/origin/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/origin/update', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
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
    this._dataService.del('/api/origin/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  public deleteMulti() {
    this.checkedItems = this.origins.filter(x => x.Checked);
    var checkedIds = [];
    for (var i = 0; i < this.checkedItems.length; ++i)
      checkedIds.push(this.checkedItems[i]["ID"]);

    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/origin/deletemulti', 'checkedOrigins', JSON.stringify(checkedIds)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      }, error => this._dataService.handleError(error));
    });
  }

  public enableDeleteButton() {    
    this.origins.filter(x => x.Checked).length != 0 ? this.deleteButtonFlag = false : this.deleteButtonFlag = true;
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }
}
