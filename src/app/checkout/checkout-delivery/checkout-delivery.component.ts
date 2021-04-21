import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart/cart.service';
import { IDelivery } from 'src/app/shared/_models/delivery';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  delivery: IDelivery[];

  constructor(private checkoutService: CheckoutService, private cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((delivery: IDelivery[]) => {
      this.delivery = delivery;
    }, error => {
      console.log(error);
    }) 
  }

  setShippingPrice(delivery: IDelivery){
    this.cartService.setShippingPrice(delivery);
  }
}
