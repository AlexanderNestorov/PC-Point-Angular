import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import {CommonsModule} from "../commons/commons.module";
import {AuthActivate} from "../guards/auth.activate";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "angular/material/card";
import {RouterModule} from "angular/router";



@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    HomeGuestComponent
  ],
  imports: [
    CommonModule,
    CommonsModule,
    NgbCarouselModule,
    MatButtonModule,
    MatCardModule,
    RouterModule


  ],
  providers: [
    AuthActivate
  ]
})
export class HomeModule { }
