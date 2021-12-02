import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/user/token-storage.service';
import {Router} from '@angular/router';
import {CartService} from "../../services/user/cart.service";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  isLoggedUserAdmin = false;
  isLoggedUserUser = false;
  username?: string;

  public isCollapsed = true;

  cartIds: number[];
  products: any[] = [];

  constructor(private tokenStorageService: TokenStorageService, private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isLoggedUserAdmin = this.roles.includes('ROLE_ADMIN');
      this.isLoggedUserUser = this.roles.includes('ROLE_USER');

      this.username = user.username;

      this.cartIds = this.cartService.getProducts();
     this.cartIds.forEach(id => {
         this.productService.findProductById(id).subscribe(product => {
           this.products.push(product);
         });
       }
       )

      console.log(this.products);

    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    window.alert('Logged out');
  }
}
