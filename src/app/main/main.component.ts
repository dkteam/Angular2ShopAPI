import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/domain/loggedin.user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;

  constructor(private _utilityService: UtilityService, private _authenService: AuthenService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
