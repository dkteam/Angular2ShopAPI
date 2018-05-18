import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { UrlConstants } from '../../core/common/url.constants';
import { UtilityService } from './utility.service';

@Injectable()
export class UploadService {
  public responseData: any;
  
  constructor(private _dataService: DataService, private _utilityService: UtilityService) { }

  postWithFile(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
        },
        error => this._dataService.handleError(error)
      );
    });
    return returnReponse;
  }
}
