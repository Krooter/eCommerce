import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faTruck, faShoppingCart, faSearch, faUser, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { ShopParams } from 'src/app/shared/_models/shopParams';

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
  cartItems = 1;
  isOpened = false;
  stringArray = ["30-DAY RETURNS AND FREE SHIPPING ON ORDERS $49+", "FREE SHIPPING & RETURNS WITH KROOTS UNLOCKED", "NANO X1. AVAILABLE NOW. GET IN ON IT."];

  constructor() { }

  ngOnInit(): void {
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