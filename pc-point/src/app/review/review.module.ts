import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewHomeComponent } from './review-home/review-home.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import {AuthActivate} from "../guards/auth.activate";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../commons/commons.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        ReviewHomeComponent,
        ReviewItemComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
    exports: [
        ReviewItemComponent
    ],
    providers: [
        AuthActivate
    ]
})
export class ReviewModule { }
