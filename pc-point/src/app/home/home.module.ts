import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import {CommonsModule} from "../commons/commons.module";
import {AuthActivate} from "../guards/auth.activate";



@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    HomeGuestComponent
  ],
    imports: [
        CommonModule,
      CommonsModule


    ],
  providers: [
    AuthActivate
  ]
})
export class HomeModule { }
