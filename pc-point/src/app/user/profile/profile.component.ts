import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/interfaces/Review";
import {ReviewService} from "../../services/review/review.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../shared/interfaces/Order";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../shared/interfaces/Product";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: any;
  reviews?: Review[];
  orders?: Order[];
  orderLength: number;
  reviewLength: number;
  panelOpenState = false;

  constructor(private token: TokenStorageService, private orderService: OrderService,
              private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getReviewsByAuthor();
    this.getOrdersByAuthor();
  }

  public getReviewsByAuthor(): void {
    this.reviewService.getAllReviewsByAuthor(this.currentUser.id).subscribe(
      (response: Review[]) => {
        this.reviews = response;
        this.reviewLength = this.reviews.length;
        console.log(this.reviews);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getOrdersByAuthor(): void {
    this.orderService.getAllOrderByUserId(this.currentUser.id).subscribe(
      (response: Order[]) => {
        this.orders = response;
        this.orderLength = this.orders.length;
        console.log(this.orders);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
