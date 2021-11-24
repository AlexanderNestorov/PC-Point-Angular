import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationItemComponent } from './location-item/location-item.component';
import {AuthActivate} from "../guards/auth.activate";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../commons/commons.module";
import {AgmCoreModule} from "@agm/core";



@NgModule({
  declarations: [
    LocationItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsModule,
    AgmCoreModule
  ],
  exports: [
    LocationItemComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class LocationModule { }
