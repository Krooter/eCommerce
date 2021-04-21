import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDelivery } from '../shared/_models/delivery';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get(this.baseUrl + 'order/delivery').pipe(
      map((delivery: IDelivery[]) => {
        return delivery.sort((a, b) => b.price - a.price);
      })
    )
  }
}
