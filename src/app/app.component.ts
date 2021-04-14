import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { CartService } from './cart/cart.service';
import { Cart } from './shared/_models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommerce';

  constructor(private cartService: CartService, private accountService: AccountService) {
  }

  ngOnInit(): void{
    this.loadCart();
    this.loadUser();
  }

  loadCart(){
    const cartId = localStorage.getItem("cart_id");
    if (cartId){
      this.cartService.getCart(cartId).subscribe(() => {
        console.log("Initialize cart")
      }, error => {
        console.log(error);
      })
    }
  }

  loadUser(){
    const token = localStorage.getItem("token");
    if(token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log("User loaded");
      }, error => {
        console.log(error);
      })
    }
  }
}

