import {Component, Input, OnInit} from '@angular/core';

import {TokenStorageService} from '../../services/user/token-storage.service';
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../shared/interfaces/Order";
import {CartService} from "../../services/user/cart.service";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../shared/interfaces/Product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  private roles: string[] = [];
  isLoggedIn = false;
  hasAdminRole = false;
  hasUserRole = false;
  private orders: Order[] = [];
  images: Product[];

  constructor( private tokenStorageService: TokenStorageService,
               private orderService: OrderService,
               private cartService: CartService,
               private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.cartService.saveProduct(1);
    console.log(this.cartService.getProducts());
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.hasAdminRole = this.roles.includes('ROLE_ADMIN');
      this.hasUserRole = this.roles.includes('ROLE_USER');
      this.getOrders();
    }
    this.getCarouselImages();

    console.log(this.tokenStorageService.getUser());
    console.log(this.tokenStorageService.isLogged);


  }

  public getOrders(): void {

    this.orderService.getAllOrders().subscribe(
      data => {
        this.orders = data;
        console.log(this.orders);
      },
      error => {
        console.log(error);
      }
    );
  }

  public getCarouselImages(): void {
    this.productService.getAllProductsByBought().subscribe(
      data => {
        this.images = data;
        console.log(this.images);
      },
      error => {
        console.log(error);
      }
    );
  }
}
