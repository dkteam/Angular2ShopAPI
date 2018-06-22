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
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  @ViewChild('slide') slide;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public pages: any[];
  public entity: any;
  public modalTitle: string='';
  public baseFolder: string = SystemConstants.BASE_API;

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
    this._dataService.get('/api/page/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((respone: any) => {
        this.pages = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
      });
  }

  loadSlide(id: any) {
    this._dataService.get('/api/page/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddEditModal() {
    this.entity = {Status: true};
    this.modalTitle = "Thêm";
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadSlide(id);
    this.modalTitle = "Chỉnh sửa";
    this.modalAddEdit.show();
  }

  saveChanged(form: NgForm) {
    if (form) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/page/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/page/update', JSON.stringify(this.entity))
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
    this._dataService.del('/api/page/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }
}
