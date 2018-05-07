import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/common/url.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _utilityService: UtilityService) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
