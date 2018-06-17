import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  public postCategories: any[];
  public entity: any={};
  public modalTitle: string='';

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
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
    this._dataService.get('/api/postcategory/getallhierachy')
      .subscribe((respone: any) => {
        this.postCategories = respone;
      });
  }

  loadPostCategory(id: any) {
    this._dataService.get('/api/postcategory/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
      });
  }

  showAddEditModal() {
    this.entity = { Status: true };
    this.modalTitle = 'Thêm';
    this.getListForDropdown();
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadPostCategory(id);
    this.modalTitle = 'Chỉnh sửa';
    this.getListForDropdown();
    this.modalAddEdit.show();
  }

  saveChanged(form: NgForm) {
    if (form) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/postcategory/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/postcategory/update', JSON.stringify(this.entity))
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
    this._dataService.del('/api/postcategory/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }

  public getListForDropdown() {
    this._dataService.get('/api/postcategory/getallhierachy')
      .subscribe((response: any[]) => {
        this.postCategories = response;
      }, error => this._dataService.handleError(error));
  }
}
