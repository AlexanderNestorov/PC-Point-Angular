import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/interfaces/Review";
import {ReviewService} from "../../services/review/review.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../shared/interfaces/Order";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, Validators} from "angular/forms";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/user/auth.service";
import {User} from "../../shared/interfaces/User";
import {Router} from "angular/router";
import {MyErrorStateMatcher} from "../../shared/MyErrorStateMatcher";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new MyErrorStateMatcher();

  currentUser?: any;
  reviews?: Review[];
  orders?: Order[];
  orderLength: number;
  reviewLength: number;
  panelOpenState = false;
  isLoggedInUserAdmin: boolean;
  form: FormGroup;
  updateForm: FormGroup;
  isFound: boolean;
  userToUpdate: User;
  errorMessage = '';

  closeResult: string;

  constructor(private token: TokenStorageService, private orderService: OrderService,
              private reviewService: ReviewService, private formBuilder: FormBuilder,
              private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
    this.form = this.formBuilder.group({
      usernameFormControl: this.usernameFormControl});
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.isLoggedInUserAdmin = this.currentUser.roles.includes('ROLE_ADMIN');
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

  public onSubmit(formData: any): void {


    const username = formData.value.usernameFormControl;


    this.authService.findUserByUsername(username).subscribe(
      data => {

        this.isFound = true;

        this.userToUpdate = data;

        console.log(data);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFound = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'search-user-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
}
