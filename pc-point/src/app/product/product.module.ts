import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {AuthActivate} from "../guards/auth.activate";
import {CommonsModule} from "../commons/commons.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {ReviewModule} from "../review/review.module";
import {MatIconModule} from "angular/material/icon";



@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductHomeComponent,
    ProductItemComponent
  ],
    imports: [
        CommonModule,
        CommonsModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        ReviewModule,
        MatIconModule
    ],
  exports: [
    ProductItemComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class ProductModule { }
