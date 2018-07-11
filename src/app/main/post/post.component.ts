import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/services/upload.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  /*Declare modal */
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild("image") image;

  /*Post manage */
  public baseFolder: string = SystemConstants.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filterCategoryID: number;
  public posts: any[];
  public postCategories: any[];
  public modalTitle: string = '';
  public inputTags: any = [];;
  public deleteButtonFlag: boolean = true;
  public checkedItems: any[];

  /*Post Image*/
  public imageEntity: any = {};
  public productImages: any = [];
  @ViewChild('imageManageModal') public imageManageModal: ModalDirective;
  @ViewChild('imagePath') imagePath;

  constructor(
    public _authenService: AuthenService,
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private _uploadService: UploadService
  ) { }

  ngOnInit() {
    this.search();
    this.loadPostCategories();
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }

  public search() {
    this._dataService.get('/api/post/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
      .subscribe((response: any) => {
        this.posts = response.Items;
        this.pageIndex = response.PageIndex;        
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      }, error => this._dataService.handleError(error));
  }

  public reset() {
    this.filter = '';
    this.filterCategoryID = null;
    this.search();
  }

  //Show add form
  public showAdd() {
    this.entity = { Content: '', Status: true };
    this.inputTags = [];
    this.modalTitle = "Thêm";
    this.addEditModal.show();
  }

  //Show edit form
  public showEdit(id: string) {
    this.modalTitle = "Chỉnh sửa";
    this._dataService.get('/api/post/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.inputTags = this._utilityService.ConvertStringCommaToArray(response.Tags);
      console.log(this.entity.Tags);
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/post/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  private loadPostCategories() {
    this._dataService.get('/api/postCategory/getallhierachy').subscribe((response: any[]) => {
      this.postCategories = response;
    }, error => this._dataService.handleError(error));
  }
  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      let fi = this.image.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=post', null, fi.files).then((imageUrl: string) => {
          this.entity.Image = imageUrl;
        }).then(() => {
          this.saveData();
        });
      }
      else {
        this.saveData();
      }
    }
  }

  private saveData() {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/post/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      });
    }
    else {
      this._dataService.put('/api/post/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }
  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  public onTagAdded(e: any) {
    if (this.inputTags == null) {
      this.inputTags = [];
    }
    this.inputTags.push(e.display);
    this.entity.Tags = this._utilityService.ConvertArrayToStringComma(this.inputTags);
  }

  public onTagRemoved(e: any) {
    const index: number = this.inputTags.indexOf(e);
    if (index !== -1) {
      this.inputTags.splice(index, 1);
    }
    this.entity.Tags = this._utilityService.ConvertArrayToStringComma(this.inputTags);
  }

  public deleteMulti() {
    this.checkedItems = this.posts.filter(x => x.Checked);
    var checkedIds = [];
    for (var i = 0; i < this.checkedItems.length; ++i)
      checkedIds.push(this.checkedItems[i]["ID"]);

    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/post/deletemulti', 'checkedPosts', JSON.stringify(checkedIds)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  public enableDeleteButton() {    
    this.posts.filter(x => x.Checked).length != 0 ? this.deleteButtonFlag = false : this.deleteButtonFlag = true;
  }
}
