import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../core/services/authen.service';
import { LoggedInUser } from '../../core/domain/loggedin.user';
import { SystemConstants } from '../../core/common/system.constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user: LoggedInUser;
  public baseFolder: string = SystemConstants.BASE_API;
  constructor(private _authenService: AuthenService) { }

  ngOnInit() {
    this.user = this._authenService.getLoggedInUser();
    //this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

}
