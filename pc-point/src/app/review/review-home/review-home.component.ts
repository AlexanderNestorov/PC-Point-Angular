import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Review} from "../../shared/interfaces/Review";
import {ProductService} from "../../services/product/product.service";
import {ReviewService} from "../../services/review/review.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../shared/interfaces/Product";
import {MyErrorStateMatcher} from "../../shared/MyErrorStateMatcher";

@Component({
  selector: 'app-review-home',
  templateUrl: './review-home.component.html',
  styleUrls: ['./review-home.component.css']
})
export class ReviewHomeComponent implements OnInit {

  textFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new MyErrorStateMatcher();

  products?: Product[];
  selectedValue: number;
  reviews?: Review[];
  add: boolean;
  updateForm: FormGroup;
  productId: number;
  author: any;

  constructor(private productService: ProductService, private reviewService: ReviewService,
              private fb: FormBuilder, private tokenStorage: TokenStorageService) {
    this.updateForm = this.fb.group({
     textFormControl: this.textFormControl
    });
  }

  updateSelect(e){
    this.selectedValue = e.target.value;
    this.getReview(this.selectedValue);
  }

  updateAdd(e) {
    this.add = true;
    this.productId = e.target.value;
    console.log(this.productId);
  }

  onAddReview(formData: any) {

    console.log(formData);

    const text = formData.form.value.textFormControl;
    const product_id = this.productId;
    const user_id = this.tokenStorage.getUser().id;
    // const text = formData.form.value.te;
    this.reviewService.addNewReview({
     text,product_id,user_id
    }).subscribe(
      response => {
        console.log(response);
        this.add = false;
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  updateAddForm() {
    this.add = false;
  }

  ngOnInit(): void {
    this.getCarsByPrice();
    this.author = this.tokenStorage.getUser();
    console.log(this.author.username);
  }

  public getCarsByPrice(): void {
    this.productService.getAllProductsByBought().subscribe(
      (response: Product[]) => {
        this.products = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getReview(id: number): void {
    this.reviewService.getAllReviewsById(id).subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert (error.message);
      }
    );

  }

  public getAuthor(): void {
    this.author = this.tokenStorage.getUser().username;
    console.log(this.author.username);
  }

}
