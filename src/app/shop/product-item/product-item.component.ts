import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/_models/product';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/cart/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  faShopingCart = faShoppingCart
  today = new Date();
  dateAdedd: Date;

  constructor(private cartService: CartService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dateAdedd = new Date(this.product.dateAdded);
  }

  calculateDate(): number{
    return this.today.getTime() - this.dateAdedd.getTime();
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.product);
    this.toast.success('Product added to your cart!');
  }
}
