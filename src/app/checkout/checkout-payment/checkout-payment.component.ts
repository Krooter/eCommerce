import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/shared/_models/cart';
import { IOrder } from 'src/app/shared/_models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private cartService: CartService, private checkoutService: CheckoutService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  onSubmitOrder(){
    const cart = this.cartService.getCurrentCartValue();
    const orderToCreate = this.getOrderToCreate(cart);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success("Order created succesfully!");
      this.cartService.deleteCartLocal(cart.id);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }

  private getOrderToCreate(cart: ICart) {
    return {
      cartId: cart.id,
      deliveryId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('shippingAddressForm').value
    }
  }
}
