import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../shared/interfaces/Review";
import {HttpErrorResponse} from "@angular/common/http";
import {ReviewService} from "../../services/review/review.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {User} from "../../shared/interfaces/User";

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {

  constructor(private reviewService: ReviewService,
              private tokenService: TokenStorageService) { }

  @Input() productId: number | undefined;
  @Input() review: Review | undefined;
  currentUser?: User;

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }

  onDelete(reviewId) {
    this.reviewService.deleteReview(reviewId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
