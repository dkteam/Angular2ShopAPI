import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryRouter } from './product-category.routes';

import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { UploadService } from '../../core/services/upload.service';

// import { NgxSelectModule,INgxSelectOptions } from 'ngx-select-ex';
// const ProductCategorySelectOptions: INgxSelectOptions = { // Check the interface for more options
//   optionValueField: 'ID',
//   optionTextField: 'Name'
// };

@NgModule({
  imports: [
    CommonModule,
    ProductCategoryRouter,
    TreeModule,
    ModalModule,
    FormsModule,
    // NgxSelectModule.forRoot(ProductCategorySelectOptions)
  ],
  declarations: [ProductCategoryComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductCategoryModule { }
