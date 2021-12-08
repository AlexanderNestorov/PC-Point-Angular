import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/user/cart.service";
import {ProductService} from "../../services/product/product.service";


@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  existingProducts: number[];

  productForRemoval: any;

  @Input() product: any | undefined;
  @Input() occurrence: any | undefined;
  @Input() products: any[] | undefined;

  constructor(private cart: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findProductByName(this.product).subscribe(
      (data: any) => {
        this.productForRemoval = data;
        console.log(this.productForRemoval);
      }
    );

  }

  removeProductFromCart(product: number){

    console.log(product);

    this.existingProducts = this.cart.getProducts();

    console.log(this.existingProducts);
    console.log(this.existingProducts.indexOf(product));


    this.existingProducts.splice(this.existingProducts.indexOf(product), 1);


    console.log(this.existingProducts);

    this.cart.saveProducts(this.existingProducts);

    console.log(this.cart.getProducts());

    window.location.reload();
  }

}
