import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../shared/interfaces/Order";


const API_URL = environment.baseUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*', 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + 'order/all');
  }

  addNewOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(API_URL + 'add', order, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(API_URL + 'update', order, httpOptions);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(API_URL + `delete/${orderId}`, httpOptions);
  }

  getAllOrderByUserId(user: string) {
    const httpParams = new HttpParams().set('user', user);
    return this.http.get<Order[]>(API_URL + 'by_user/' + user, {
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
