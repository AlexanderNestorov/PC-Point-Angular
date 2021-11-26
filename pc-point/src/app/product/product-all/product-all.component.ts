import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../shared/interfaces/Product";

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  products?: Product[];
  private roles: string[] = [];
  isLoggedIn = false;
  hasAdminRole = false;
  hasUserRole = false;
  length: number;
  searchText;
  pageOfItems: Array<any>;

  constructor(private productsService: ProductService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.hasAdminRole = this.roles.includes('ROLE_ADMIN');
      this.hasUserRole = this.roles.includes('ROLE_USER');
    }
    this.getCars();
  }

  public getCars(): void {
    this.productsService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.length = this.products.length;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
