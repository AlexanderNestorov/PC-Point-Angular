import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../../shared/interfaces/Review';
import {AddReview} from '../../shared/interfaces/AddReview';
import {environment} from "../../../environments/environment.prod";

const API_URL = environment.baseUrl + 'review/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*', 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL + 'all');
  }
  addNewReview(review: AddReview): Observable<Review> {
    return this.http.post<Review>(API_URL + 'add', review, httpOptions);
  }
  getAllReviewsById(id: number) {
    const httpParams = new HttpParams().set('id',id.toString());
    return this.http.get<Review[]>(API_URL + 'by_product/' + id, {
      params: httpParams
    } );
  }

  public deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(API_URL + `delete/${reviewId}`, httpOptions);
  }
  getAllReviewsByAuthor(authorId: number) {
    const httpParams = new HttpParams().set('id', authorId.toString());
    return this.http.get<Review[]>(API_URL + 'by_user/' + authorId, {
      params: httpParams
    } );
  }
}
