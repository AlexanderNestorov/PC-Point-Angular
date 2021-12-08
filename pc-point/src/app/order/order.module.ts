import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthActivate} from "../guards/auth.activate";
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import {CommonsModule} from "../commons/commons.module";
import {MatExpansionModule} from "angular/material/expansion";
import {MatButtonModule} from "angular/material/button";
import { OrderProductComponent } from './order-product/order-product.component';



@NgModule({
  declarations: [
    OrderItemComponent,
    OrderConfirmComponent,
    OrderProductComponent
  ],
  imports: [
    CommonModule,
    CommonsModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports: [
    OrderItemComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class OrderModule { }
