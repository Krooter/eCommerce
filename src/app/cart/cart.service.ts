import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart, ICart, ICartItem, ICartTotals } from '../shared/_models/cart';
import { IDelivery } from '../shared/_models/delivery';
import { IProduct } from '../shared/_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<ICart>(null);
  private cartTotalSource = new BehaviorSubject<ICartTotals>(null);
  cartTotal$ = this.cartTotalSource.asObservable();
  cart$ = this.cartSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  getCart(id: string){
    return this.http.get(this.baseUrl + 'cart?id=' + id)
      .pipe(
        map((cart: ICart) => {
          this.cartSource.next(cart);
          this.calculateTotals();
        })
      );
  }

  setCart(cart: ICart){
    return this.http.post(this.baseUrl + 'cart', cart).subscribe((response: ICart) => {
      this.cartSource.next(response);
      this.calculateTotals();
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

  cartIncrQuantity(item: ICartItem){
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id);
    cart.items[foundItemIndex].quantity++;
    this.setCart(cart);
  }

  cartDecrQuantity(item: ICartItem){
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id);
    if(cart.items[foundItemIndex].quantity > 1){
      cart.items[foundItemIndex].quantity--;
      this.setCart(cart);
    } else {
      this.removeItemFromCart(item);
    }
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    if (cart.items.some(x => x.id === item.id)){
      cart.items = cart.items.filter(i => i.id !== item.id);
      if (cart.items.length > 0){
        this.setCart(cart);
      } else if (cart.items.length === 0){
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(cart: ICart) {
    return this.http.delete(this.baseUrl + 'cart?id=' + cart.id).subscribe(() => {
      this.cartSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('cart_id');
    }, error => {
      console.log(error);
    })  
  }

  deleteCartLocal(cartId: string){
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('cart_id');
    }

  private calculateTotals(){
    const cart = this.getCurrentCartValue();
    const shipping = this.shipping;
    const discount = 1;
    const subtotal = cart.items.reduce((a, b) =>(b.price * b.quantity) + a, 0);
    const total = (shipping + subtotal) * discount;
    this.cartTotalSource.next({shipping, total, subtotal});
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
      pictureUrl: item.photo[0].photoUrl1,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
  
  setShippingPrice(delivery: IDelivery){
    this.shipping = delivery.price;
    this.calculateTotals();
  }
}


