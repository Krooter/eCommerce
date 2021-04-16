import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faTruck, faShoppingCart, faSearch, faUser, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/shared/_models/cart';
import { IUser } from 'src/app/shared/_models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  faTruck = faTruck;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  faTimes = faTimes;
  faBars = faBars;
  isOpened = false;
  cart$: Observable<ICart>;
  currentUser$: Observable<IUser>;
  stringArray = ["30-DAY RETURNS AND FREE SHIPPING ON ORDERS $49+", "FREE SHIPPING & RETURNS WITH KROOTS UNLOCKED", "NANO X1. AVAILABLE NOW. GET IN ON IT."];

  constructor(private router: Router, private cartService: CartService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.cart$ = this.cartService.cart$;
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

  isOpen(){
    this.isOpened = !this.isOpened;
  }

  calculateClass(){
    if(this.isOpened){
      return {
        'row': true,
        'hamburger-menu': false
      }
    } else {
      return {
        'row': false,
        'hamburger-menu': true
      }
    }
  }
}
