import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRouter } from './product.routes';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { UploadService } from './../../core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { CKEditorComponent } from 'ng2-ckeditor';
//import { SimpleTinyComponent } from '../../shared/simple-tiny/simple-tiny.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { TagInputModule } from 'ngx-chips';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ProductRouter,
    FormsModule,
    PaginationModule,
    ModalModule,
    Daterangepicker,
    MultiselectDropdownModule,
    CKEditorModule,
    TagInputModule,
    //BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent,CKEditorComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductModule { }
