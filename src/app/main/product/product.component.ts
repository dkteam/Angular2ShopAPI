import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';

import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/services/upload.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { Router } from '@angular/router';
// import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  /*Declare modal */
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild("thumbnailImage") thumbnailImage;
  /*Product manage */
  public baseFolder: string = SystemConstants.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filterCategoryID: number;
  public products: any[];
  public productCategories: any[];
  public brands: any[];
  public origins: any[];
  public inputTags: any = [];;
  public checkedItems: any[];
  public deleteButtonFlag: boolean = true;
  
  /*Product Image*/
  public imageEntity: any = {};
  public productImages: any = [];
  @ViewChild('imageManageModal') public imageManageModal: ModalDirective;
  @ViewChild('imagePath') imagePath;

  /*Quantity manage*/
  // @ViewChild('quantityManageModal') public quantityManageModal: ModalDirective;
  // public quantityEntity: any = {};
  // public productQuantities: any = [];
  // public colorId: number = null;
  // public sizeId: number = null;
  // public colors: any[];
  // public sizes: any[];

  constructor(public _authenService: AuthenService,
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private _uploadService: UploadService
  ) {

  }

  ngOnInit() {
    this.search();
    this.loadProductCategories();
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }
  public search() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
      }, error => this._dataService.handleError(error));
  }
  public reset() {
    this.filter = '';
    this.filterCategoryID = null;
    this.search();
  }
  //Show add form
  public showAdd() {
    this.inputTags = [];
    this.entity = { Content: '', Status: true };
    this.loadBrands();
    this.loadOrigins();
    this.addEditModal.show();
  }
  //Show edit form
  public showEdit(id: string) {
    this.entity = {};
    this.loadBrands();
    this.loadOrigins();
    this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.inputTags = this._utilityService.ConvertStringCommaToArray(response.Tags);
      console.log(this.entity.Tags);
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/product/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  private loadProductCategories() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }

  private loadBrands() {
    this._dataService.get('/api/brand/getall?filter=').subscribe((response: any[]) => {
      this.brands = response;
    }, error => this._dataService.handleError(error));
  }
  
  private loadOrigins() {
    this._dataService.get('/api/origin/getall?filter=').subscribe((response: any[]) => {
      this.origins = response;
    }, error => this._dataService.handleError(error));
  }
  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      let fi = this.thumbnailImage.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: string) => {
          this.entity.ThumbnailImage = imageUrl;
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
      this._dataService.post('/api/product/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      });
    }
    else {
      this._dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
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
    if(this.inputTags==null){
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
    this.checkedItems = this.products.filter(x => x.Checked);
    var checkedIds = [];
    for (var i = 0; i < this.checkedItems.length; ++i)
      checkedIds.push(this.checkedItems[i]["ID"]);

    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  public enableDeleteButton() {    
    this.products.filter(x => x.Checked).length != 0 ? this.deleteButtonFlag = false : this.deleteButtonFlag = true;
  }

  /*Image management*/
  public showImageManage(id: number) {
    this.imageEntity = {
      ProductId: id
    };
    this.loadProductImages(id);
    this.imageManageModal.show();
  }

  public loadProductImages(id: number) {
    this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((response: any[]) => {
      this.productImages = response;
    }, error => this._dataService.handleError(error));
  }
  public deleteImage(id: number) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.del('/api/productImage/delete', 'id', id.toString()).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadProductImages(this.imageEntity.ProductId);
      }, error => this._dataService.handleError(error));
    });
  }

  public saveProductImage(isValid: boolean) {
    if (isValid) {
      let fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: string) => {
          this.imageEntity.Path = imageUrl;
          this._dataService.post('/api/productImage/add', JSON.stringify(this.imageEntity)).subscribe((response: any) => {
            this.loadProductImages(this.imageEntity.ProductId);
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          });
        });
      }
    }
  }

  /*Quản lý số lượng */
  // public showQuantityManage(id: number) {
  //   this.quantityEntity = {
  //     ProductId: id
  //   };
  //   this.loadColors();
  //   this.loadSizes();
  //   this.loadProductQuantities(id);
  //   this.quantityManageModal.show();

  // }
  // public loadColors() {
  //   this._dataService.get('/api/productQuantity/getcolors').subscribe((response: any[]) => {
  //     this.colors = response;
  //   }, error => this._dataService.handleError(error));
  // }
  // public loadSizes() {
  //   this._dataService.get('/api/productQuantity/getsizes').subscribe((response: any[]) => {
  //     this.sizes = response;
  //   }, error => this._dataService.handleError(error));
  // }

  // public loadProductQuantities(id: number) {
  //   this._dataService.get('/api/productQuantity/getall?productId=' + id + '&sizeId=' + this.sizeId + '&colorId=' + this.colorId).subscribe((response: any[]) => {
  //     this.productQuantities = response;
  //   }, error => this._dataService.handleError(error));
  // }

  // public saveProductQuantity(isValid: boolean) {
  //   if (isValid) {
  //     this._dataService.post('/api/productQuantity/add', JSON.stringify(this.quantityEntity)).subscribe((response: any) => {
  //       this.loadProductQuantities(this.quantityEntity.ProductId);
  //       this.quantityEntity = {
  //         ProductId: this.quantityEntity.ProductId
  //       };
  //       this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
  //     }, error => this._dataService.handleError(error));
  //   }
  // }

  // public deleteQuantity(productId: number, colorId: string, sizeId: string) {
  //   var parameters = { "productId": productId, "sizeId": sizeId, "colorId": colorId };
  //   this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
  //     this._dataService.deleteWithMultiParams('/api/productQuantity/delete', parameters).subscribe((response: any) => {
  //       this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
  //       this.loadProductQuantities(productId);
  //     }, error => this._dataService.handleError(error));
  //   });
  // }
}
