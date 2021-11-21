import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthActivate} from "../guards/auth.activate";
import { OrderItemComponent } from './order-item/order-item.component';



@NgModule({
  declarations: [
    OrderItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderItemComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class OrderModule { }
