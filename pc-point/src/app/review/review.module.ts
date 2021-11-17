import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewHomeComponent } from './review-home/review-home.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import {AuthActivate} from "../guards/auth.activate";



@NgModule({
  declarations: [
    ReviewHomeComponent,
    ReviewItemComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthActivate
  ]
})
export class ReviewModule { }
