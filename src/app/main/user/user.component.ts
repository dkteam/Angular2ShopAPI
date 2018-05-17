import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  public myRoles: string[] = [];
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;

  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-primary',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true,
    showCheckAll: true,
    stopScrollPropagation: true,
    showUncheckAll: true,
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Đã chọn tất cả',
    uncheckAll: 'Bỏ chọn tất cả',
    checked: 'Đã chọn',
    checkedPlural: 'Đã chọn',
    searchPlaceholder: 'Tìm...',
    searchEmptyResult: 'Không tìm thấy...',
    searchNoRenderText: 'Gõ từ khóa cần tìm...',
    defaultTitle: 'Chọn nhóm...',
    allSelected: 'Tất cả',
  };

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true
  };

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((respone: any) => {
        this.users = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
      });
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;

        for(let role of this.entity.Roles){
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddEditModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  saveChanged(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
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
    this._dataService.del('/api/appUser/delete', 'id', id)
      .subscribe((respone: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }
}
