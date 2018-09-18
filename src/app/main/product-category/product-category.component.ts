import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeComponent } from 'angular-tree-component';
import { MessageConstants } from '../../core/common/message.constants';
import { UploadService } from '../../core/services/upload.service';
import { SystemConstants } from '../../core/common/system.constants';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild("image") image;
  @ViewChild("icon") icon;
  @ViewChild(TreeComponent) private treeProductCategory: TreeComponent;
  public filter: string = '';
  public entity: any = {};
  public functionId: string;
  public _productCategoryHierachy: any[];
  public _productCategories: any[];
  public _productCategoriesForDropDownList: any[];
  public modalTitle: string = '';
  public baseFolder: string = SystemConstants.BASE_API;

  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
    private _uploadService: UploadService
  ) { }

  ngOnInit() {
    this.search();
  }
  public createAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }
  //Load data
  public search() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._productCategoryHierachy = this.utilityService.Unflatten2(response);
        this._productCategories = response;
      }, error => this._dataService.handleError(error));
  }
  public getListForDropdown() {
    this._dataService.get('/api/productCategory/getallhierachy')
      .subscribe((response: any[]) => {
        this._productCategoriesForDropDownList = response;
      }, error => this._dataService.handleError(error));
  }
  //Show add form
  public showAdd() {
    this.entity = { Status: true };
    this.modalTitle = 'Thêm';
    this.getListForDropdown();
    this.addEditModal.show();
  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/productCategory/detail/' + id).subscribe((response: any) => {
      this.getListForDropdown();
      this.modalTitle = 'Chỉnh sửa';
      this.entity = response;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.del('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  //Click button delete turn on confirm
  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }
  //Save change for modal popup
  // public saveChanges(valid: boolean) {
  //   if (valid) {
  //     if (this.entity.ID == undefined) {
  //       this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
  //         this.search();
  //         this.addEditModal.hide();
  //         this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
  //       }, error => this._dataService.handleError(error));
  //     }
  //     else {
  //       this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
  //         this.search();
  //         this.addEditModal.hide();
  //         this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
  //       }, error => this._dataService.handleError(error));

  //     }
  //   }

  // }

  //Save change for modal popup
  public saveChanges(form: NgForm) {
    if (form.valid) {
      let img = this.image.nativeElement;
      let ico = this.icon.nativeElement;
      if (img.files.length > 0 && ico.files.length <= 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=productcategories', null, img.files).then((imageUrl: string) => {
          this.entity.Image = imageUrl;
        }).then(() => {
          this.saveData(form);
        });
      }else if(img.files.length <= 0 && ico.files.length > 0){
        this._uploadService.postWithFile('/api/upload/saveImage?type=icon', null, ico.files).then((iconUrl: string) => {
          this.entity.Icon = iconUrl;
        }).then(() => {
          this.saveData(form);
        });
      }else if (img.files.length > 0 && ico.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=icon', null, ico.files).then((iconUrl: string) => {
          this.entity.Icon = iconUrl;
        }).then(() => {
          this._uploadService.postWithFile('/api/upload/saveImage?type=productcategories', null, img.files).then((imageUrl: string) => {
            this.entity.Image = imageUrl;
            this.saveData(form);
          });          
        });
      }
      else {
        this.saveData(form);
      }     
    }
  }
  private saveData(form) {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        form.resetForm();
        this.resetInputFile();
        this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      });
    }
    else {
      this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        form.resetForm();
        this.resetInputFile();
        this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  // saveChanges(form: NgForm) {
  //   if (form) {
  //     if (this.entity.ID == undefined) {
  //       this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity))
  //         .subscribe((respone: any) => {
  //           this.search();
  //           this.addEditModal.hide();
  //           form.resetForm();
  //           this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
  //         }, error => this._dataService.handleError(error));
  //     }
  //     else {
  //       this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity))
  //         .subscribe((respone: any) => {
  //           this.search();
  //           this.addEditModal.hide();
  //           form.resetForm();
  //           this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
  //         }, error => this._dataService.handleError(error));
  //     }
  //   }
  // }
  resetInputFile() {
    this.icon.nativeElement.value = "";
    this.image.nativeElement.value = "";
  }

  public onSelectedChange($event) {
    console.log($event);
  }
}
