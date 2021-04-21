import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { ICart, ICartItem } from '../shared/_models/cart';
import { IUser } from '../shared/_models/user';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: Observable<ICart>;
  currentUser$: Observable<IUser>;

  constructor(private cartService: CartService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.currentUser$ = this.accountService.currentUser$;
    this.cartService.shipping = 0;
  }

  removeCartItem(item: ICartItem){
    this.cartService.removeItemFromCart(item);
  }

  increment(item: ICartItem){
    this.cartService.cartIncrQuantity(item);
  }

  decrement(item: ICartItem){
    this.cartService.cartDecrQuantity(item);
  }
}
