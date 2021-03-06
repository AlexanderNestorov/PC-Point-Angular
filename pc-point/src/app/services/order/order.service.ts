import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../shared/interfaces/Order";
import {AddOrder} from "../../shared/interfaces/AddOrder";


const API_URL = environment.baseUrl + 'order/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*', 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + 'all', {
      headers: httpOptions.headers
    });
  }

  addNewOrder(order: AddOrder): Observable<Order> {
    return this.http.post<Order>(API_URL + 'add', order, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(API_URL + 'update', order, httpOptions);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(API_URL + `delete/${orderId}`, httpOptions);
  }

  getAllOrderByUserId(userId: number): Observable<Order[]> {
    const httpParams = new HttpParams().set('id', userId.toString());
    return this.http.get<Order[]>(API_URL + 'by_user/' + userId, {
      params: httpParams
    } );
  }

  findOrderById(orderId: number) {
    const httpParams = new HttpParams().set('id', orderId.toString());
    return this.http.get<Order>(API_URL + 'find/' + orderId, {
        params: httpParams,
        headers: httpOptions.headers
      }
    );
  }
}
