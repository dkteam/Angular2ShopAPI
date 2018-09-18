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
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  @ViewChild('logo') logo;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public contactDetails: any[];
  public entity: any;
  public modalTitle: string = '';
  public baseFolder: string = SystemConstants.BASE_API;

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private _uploadService: UploadService,
    public _authenService: AuthenService) { }

 
    ngOnInit() {
      this.loadData();
    }
  
    loadData() {
      this._dataService.get('/api/contactDetail/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
        .subscribe((respone: any) => {
          this.contactDetails = respone.Items;
          this.pageIndex = respone.PageIndex;
          this.pageSize = respone.PageSize;
          this.totalRow = respone.TotalRows;
        });
    }
  
    loadBrand(id: any) {
      this._dataService.get('/api/contactDetail/detail/' + id)
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
      this.loadBrand(id);
      this.modalTitle = "Chỉnh sửa";
      this.modalAddEdit.show();
    }  
  saveChanged(form: NgForm) {
    if (form) {
      //this.entity.Roles = this.myRoles;
      let fi = this.logo.nativeElement;

      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=logo', null, fi.files).then((logoUrl: string) => {
          this.entity.Logo = logoUrl;
        }).then(() => {
          this.saveData(form);
        });
      }
      else {
        this.saveData(form);
      }
    }
  }

  private saveData(form: NgForm) {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/contactDetail/add', JSON.stringify(this.entity))
        .subscribe((respone: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/contactDetail/update', JSON.stringify(this.entity))
        .subscribe((respone: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }
}
