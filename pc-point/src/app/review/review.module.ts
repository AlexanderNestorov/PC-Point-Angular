import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewHomeComponent } from './review-home/review-home.component';
import { ReviewItemComponent } from './review-item/review-item.component';



@NgModule({
  declarations: [
    ReviewHomeComponent,
    ReviewItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReviewModule { }
