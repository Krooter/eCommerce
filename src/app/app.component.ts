import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { Cart } from './shared/_models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommerce';

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void{
    const cartId = localStorage.getItem("cart_id");
    if (cartId){
      this.cartService.getCart(cartId).subscribe(() => {
        console.log("Initialize cart")
      }, error => {
        console.log(error);
      })
    }
  }
}

