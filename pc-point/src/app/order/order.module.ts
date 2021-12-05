import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthActivate} from "../guards/auth.activate";
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';



@NgModule({
  declarations: [
    OrderItemComponent,
    OrderConfirmComponent
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
