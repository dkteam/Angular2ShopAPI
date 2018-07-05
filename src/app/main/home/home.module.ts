import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import{Routes, RouterModule} from '@angular/router';
import { Angulartics2Module } from 'angulartics2';

const homeRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/user/index
  { path: 'index', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    Angulartics2Module,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
