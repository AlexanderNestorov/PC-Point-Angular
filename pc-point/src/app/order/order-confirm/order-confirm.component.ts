import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/user/cart.service";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  total: number = 0;
  productsInCart: any[] = [];
  productIds: any[];
  productsInOrder: any[] = [];

  panelOpenState = true;

  constructor(private cart: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.productIds = this.cart.getProducts();

    console.log(this.productIds);

    this.productIds.forEach(id => {
        this.productService.findProductById(id).subscribe(product => {
          this.productsInCart.push(product);
          this.total += product.price;
          this.productsInOrder = this.findOcc(this.productsInCart, 'name');

          console.log(this.productsInOrder);

        });
      }

  )
    console.log(this.productsInCart);



  }

   findOcc(arr, key): any[]{
    let arr2 = [];

    arr.forEach((x)=>{

      // Checking if there is any object in arr2
      // which contains the key value
      if(arr2.some((val)=>{ return val[key] == x[key] })){

        // If yes! then increase the occurrence by 1
        arr2.forEach((k)=>{
          if(k[key] === x[key]){
            k["occurrence"]++
          }
        })

      }else{
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        let a = {}
        a[key] = x[key]
        a["occurrence"] = 1
        arr2.push(a);
      }
    })
     return arr2
  }

}
