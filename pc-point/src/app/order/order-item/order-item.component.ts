import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../shared/interfaces/Order";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  constructor() { }

  @Input() order: Order | undefined;

  ngOnInit(): void {
  }

}
