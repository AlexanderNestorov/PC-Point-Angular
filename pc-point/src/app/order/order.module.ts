import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderAllComponent } from './order-all/order-all.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHomeComponent } from './order-home/order-home.component';
import { OrderItemComponent } from './order-item/order-item.component';



@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderAllComponent,
    OrderDetailsComponent,
    OrderHomeComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
