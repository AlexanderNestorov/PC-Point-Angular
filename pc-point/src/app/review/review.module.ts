import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewHomeComponent } from './review-home/review-home.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import {AuthActivate} from "../guards/auth.activate";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        ReviewHomeComponent,
        ReviewItemComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
    exports: [
        ReviewItemComponent
    ],
    providers: [
        AuthActivate
    ]
})
export class ReviewModule { }
