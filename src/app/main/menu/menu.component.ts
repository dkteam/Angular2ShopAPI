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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  @ViewChild("icon") icon;
  public baseFolder: string = SystemConstants.BASE_API;

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public menus: any[];
  public entity: any;
  public modalTitle: string = '';
  public deleteButtonFlag: boolean = true;
  public checkedItems: any[];
  public menuGroups: any[];
  public menusNonPaging: any[];

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
    this._dataService.get('/api/menu/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyWord=' + this.filter)
      .subscribe((respone: any) => {
        this.menus = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
      });
  }


  loadDetail(id: any) {
    this._dataService.get('/api/menu/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddEditModal() {
    this.entity = { Target: false, Status: true };
    this.loadMenuGroups();
    this.loadMenusNonPaging();
    this.modalTitle = "Thêm";
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadDetail(id);
    this.loadMenuGroups();
    this.loadMenusNonPaging();
    this.modalTitle = "Chỉnh sửa";
    this.modalAddEdit.show();
  }


  // saveChanged(form: NgForm) {
  //   if (form.valid) {
  //     if (this.entity.ID == undefined) {
  //       this._dataService.post('/api/menu/add', JSON.stringify(this.entity))
  //         .subscribe((respone: any) => {
  //           this.loadData();
  //           this.modalAddEdit.hide();
  //           form.resetForm();
  //           this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
  //         }, error => this._dataService.handleError(error));
  //     }
  //     else {
  //       this._dataService.put('/api/menu/update', JSON.stringify(this.entity))
  //         .subscribe((respone: any) => {
  //           this.loadData();
  //           this.modalAddEdit.hide();
  //           form.resetForm();
  //           this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
  //         }, error => this._dataService.handleError(error));
  //     }
  //   }
  // }

  public saveChanged(form: NgForm) {
    if (form.valid) {
      let ico = this.icon.nativeElement;
      if(ico.files.length > 0){
        this._uploadService.postWithFile('/api/upload/saveImage?type=icon', null, ico.files).then((iconUrl: string) => {
          this.entity.Icon = iconUrl;
        }).then(() => {
          this.saveData(form);
        });
      }
      else {
        this.saveData(form);
      }     
    }
  }

  private saveData(form) {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/menu/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        form.resetForm();
        this.resetInputFile();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      });
    }
    else {
      this._dataService.put('/api/menu/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        form.resetForm();
        this.resetInputFile();
        this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this.deleteItemConfirm(id)
    });
  }

  deleteItemConfirm(id: any) {
    this._dataService.del('/api/menu/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  public createAlias() {
    this.entity.URL = this._utilityService.MakeSeoTitle(this.entity.Name);
  }

  private loadMenuGroups() {
    this._dataService.get('/api/menuGroup/getall?filter=').subscribe((response: any[]) => {
      this.menuGroups = response;
    }, error => this._dataService.handleError(error));
  }

  private loadMenusNonPaging() {
    this._dataService.get('/api/menu/getall').subscribe((response: any[]) => {
      this.menusNonPaging = response;
    }, error => this._dataService.handleError(error));
  }

  public deleteMulti() {
    this.checkedItems = this.menus.filter(x => x.Checked);
    var checkedIds = [];
    for (var i = 0; i < this.checkedItems.length; ++i)
      checkedIds.push(this.checkedItems[i]["ID"]);

    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/menu/deletemulti', 'checkedItems', JSON.stringify(checkedIds)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      }, error => this._dataService.handleError(error));
    });
  }

  public enableDeleteButton() {    
    this.menus.filter(x => x.Checked).length != 0 ? this.deleteButtonFlag = false : this.deleteButtonFlag = true;
  }

  resetInputFile() {
    this.icon.nativeElement.value = "";
  }
}
