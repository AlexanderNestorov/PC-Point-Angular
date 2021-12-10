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
  products: any[] = [];
  total: number = 0;

  ngOnInit(): void {

    this.order.products.forEach(product => {
      this.total += product.price;
    });

    this.products = this.findOccurrences(this.order.products,'name');
    console.log(this.products);

  }

  findOccurrences(array, key): any[]{
    let newArray = [];

    array.forEach((object)=>{
      if(newArray.some((value)=>{ return value[key] == object[key] })){

        newArray.forEach((key)=>{
          if(key[key] === object[key]){
            key["occurrence"]++
            key["price"] += object.price;
            key["imageUrl"] = object.imageUrl;
          }
        })

      }else{
        let a = {}
        a[key] = object[key]
        a["occurrence"] = 1
        a["price"] = object.price;
        a["imageUrl"] = object.imageUrl;
        newArray.push(a);
      }
    })
    return newArray;
  }

}
