import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/_models/product';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  faShopingCart = faShoppingCart

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.product);
  }

}
