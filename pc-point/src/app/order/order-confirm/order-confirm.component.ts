import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/user/cart.service";
import {ProductService} from "../../services/product/product.service";
import {OrderService} from "../../services/order/order.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {Router} from "@angular/router";

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

  constructor(private cart: CartService, private productService: ProductService,
              private orderService: OrderService, private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.productIds = this.cart.getProducts();

    if (this.productIds.length === 0) {
      this.panelOpenState = false;
    }

    console.log(this.productIds);

    this.productIds.forEach(id => {
        this.productService.findProductById(id).subscribe(product => {
          this.productsInCart.push(product);
          this.total += product.price;
          this.productsInOrder = this.findOccurrences(this.productsInCart, 'name');

          console.log(this.productsInOrder);

        });
      }

  )
    console.log(this.productsInCart);



  }

   findOccurrences(array, key): any[]{
    let newArray = [];

    array.forEach((object)=>{

      // Checking if there is any object in arr2
      // which contains the key value
      if(newArray.some((value)=>{ return value[key] == object[key] })){

        // If yes! then increase the occurrence by 1
        newArray.forEach((key)=>{
          if(key[key] === object[key]){
            key["occurrence"]++
            key["price"] += object.price;
            key["imageUrl"] = object.imageUrl;
          }
        })

      }else{
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        let a = {}
        a[key] = object[key]
        a["occurrence"] = 1;
        a["price"] = object.price;
        a["imageUrl"] = object.imageUrl;
        newArray.push(a);
      }
    })
     return newArray;
  }

  makeOrder() {

    if(this.productsInCart.length === 0){
      alert("Your cart is empty!");
      return;
    }

    const user = this.token.getUser();

    console.log(user);

    this.orderService.addNewOrder({
      buyer: user.id,
      products: this.productIds
    }).subscribe(order => {
      console.log(order);
    });

    this.cart.removeAllProducts();

    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });

  }

  return() {
    this.router.navigate(['/all']);
  }

}
