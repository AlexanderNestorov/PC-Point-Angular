import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationHomeComponent } from './location-home/location-home.component';
import { LocationItemComponent } from './location-item/location-item.component';
import {AuthActivate} from "../guards/auth.activate";



@NgModule({
  declarations: [
    LocationHomeComponent,
    LocationItemComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthActivate
  ]
})
export class LocationModule { }
