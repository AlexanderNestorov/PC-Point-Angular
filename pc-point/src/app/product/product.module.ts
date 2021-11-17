import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {AuthActivate} from "../guards/auth.activate";



@NgModule({
  declarations: [
    ProductAllComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductHomeComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthActivate
  ]
})
export class ProductModule { }
