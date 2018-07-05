import { Component, OnInit } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService
  // ) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       myGlobals.newga('set', 'page', event.urlAfterRedirects);
  //       myGlobals.newga('send', 'pageview');
  //     }
  //   });
  // }

  // submitEvent() {
  //   this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
  // }

  constructor(){}
  ngOnInit() {
  }

}
