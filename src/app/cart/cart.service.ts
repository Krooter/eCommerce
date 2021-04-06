import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart, ICart, ICartItem } from '../shared/_models/cart';
import { IProduct } from '../shared/_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<ICart>(null);
  cart$ = this.cartSource.asObservable();

  constructor(private http: HttpClient) { }

  getCart(id: string){
    return this.http.get(this.baseUrl + 'cart?id=' + id)
      .pipe(
        map((cart: ICart) => {
          this.cartSource.next(cart);
          console.log(this.getCurrentCartValue());
        })
      );
  }

  setCart(cart: ICart){
    return this.http.post(this.baseUrl + 'cart', cart).subscribe((response: ICart) => {
      this.cartSource.next(response);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentCartValue(){
    return this.cartSource.value;
  }

  addItemToCart(item: IProduct, quantity = 1){
    const itemToAdd: ICartItem = this.mapItemToCart(item, quantity);
    const cart = this.getCurrentCartValue() ?? this.createBasket();
    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);

    this.setCart(cart);
  }

  private addOrUpdateItem(items: ICartItem[], itemToAdd: ICartItem, quantity: number): ICartItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  private createBasket(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);

    return cart;
  }
  
  private mapItemToCart(item: IProduct, quantity: number): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}


