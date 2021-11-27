import { Injectable } from '@angular/core';


const PRODUCTS = 'products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: number[] = [1,2,3];

  constructor() { }


  public saveProduct(product_id: number): void {
    this.products.push(product_id);
    window.sessionStorage.setItem(PRODUCTS, JSON.stringify(this.products));
  }

  public getProducts(): number[] {
    return window.sessionStorage.getItem(PRODUCTS) ? JSON.parse(window.sessionStorage.getItem(PRODUCTS)) : [];
  }

  public setProducts(): void {
    window.sessionStorage.setItem(PRODUCTS, JSON.stringify(this.products));
  }
}
