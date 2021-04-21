import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDelivery } from '../shared/_models/delivery';
import { IOrderToCreat } from '../shared/_models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreat){
    return this.http.post(this.baseUrl + 'order', order)
  }

  getDeliveryMethods(){
    return this.http.get(this.baseUrl + 'order/delivery').pipe(
      map((delivery: IDelivery[]) => {
        return delivery.sort((a, b) => b.price - a.price);
      })
    )
  }
}
