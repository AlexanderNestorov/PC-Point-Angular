import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/interfaces/Product";
import {Review} from "../../shared/interfaces/Review";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {ReviewService} from "../../services/review/review.service";
import {ProductService} from "../../services/product/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Location} from '@angular/common';
import {CartService} from "../../services/user/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  currentUser: any;
  isAdmin: boolean;
  reviews?: Review[];
  panelOpenState: boolean;
  existingProducts: number[];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService, private router: Router, private location: Location,
              private reviewService: ReviewService, private cart: CartService) {

  }

  ngOnInit(): void {
    this.getProductById();
    this.getReviewsForCar();
  }

  getProductById(): void {
    this.product = undefined;
    const id = this.activatedRoute.snapshot.params.productId;
    this.productService.findProductById(id).subscribe(
      (response: Product) => {
        console.log(response);
        this.product  = response;
        this.currentUser = this.tokenStorage.getUser();
        this.isAdmin = this.currentUser.roles.includes('ROLE_ADMIN');
        console.log(this.isAdmin);
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  onDelete(carId: number) {
    this.productService.deleteProduct(carId).subscribe(
      (response: void) => {
        console.log(response);
        this.router.navigate(['/all']).then(() => window.location.reload());
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  back() {
    this.location.back();
  }

  getReviewsForCar() {
    const id = this.activatedRoute.snapshot.params.productId;
    this.reviewService.getAllReviewsById(id).subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addProductToCart(product: number) {
    // Parse any JSON previously stored in products
    this.existingProducts = this.cart.getProducts();


    console.log(this.existingProducts);

    this.existingProducts.push(product);


    console.log(this.existingProducts);

    this.cart.saveProducts(this.existingProducts);

    console.log(this.cart.getProducts());


  }

}
