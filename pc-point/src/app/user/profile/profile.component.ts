import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/interfaces/Review";
import {ReviewService} from "../../services/review/review.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {OrderService} from "../../services/order/order.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: any;
  reviews?: Review[];
  carLength: number;
  reviewLength: number;

  constructor(private token: TokenStorageService, private orderService: OrderService,
              private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}
