import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/shared/_models/cart';
import { IOrder } from 'src/app/shared/_models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrorsNumber: any;
  cardErrorsExpiry: any;
  cardErrorsCvc: any;
  cardHandlerNumber = this.onChangeNumber.bind(this);
  cardHandlerExpiry = this.onChangeExpiry.bind(this);
  cardHandlerCvc = this.onChangeCvc.bind(this);
  loading = false;

  constructor(private cartService: CartService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) { }
  
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardCvc.destroy();
    this.cardExpiry.destroy();
  }
  
  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51IijhpJi4gPIE5cfL5EwWbmKqP7bAysPpryQm0kGbG1pKeRXTjSQuDiiKNSXkGWcZjFGdxv9F1hlkdBRunS3RPuS00FcdernOs');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandlerNumber);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandlerExpiry);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandlerCvc);
  }

  onChangeNumber({error}){
    if (error) {
      this.cardErrorsNumber = error.message;
    } else {
      this.cardErrorsNumber = null;
    }
  }

  onChangeExpiry({error}){
    if (error) {
      this.cardErrorsExpiry = error.message;
    } else {
      this.cardErrorsExpiry = null;
    }
  }

  onChangeCvc({error}){
    if (error) {
      this.cardErrorsCvc = error.message;
    } else {
      this.cardErrorsCvc = null;
    }
  }

  async onSubmitOrder(){
    this.loading = true;
    const cart = this.cartService.getCurrentCartValue();
    try {
      const createdOrder = await this.createOrder(cart);
      const paymentResult = await this.confirmPaymentWithStripe(cart);
  
      if(paymentResult.paymentIntent){
        this.cartService.deleteCartLocal(cart.id);
        const orderState: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], orderState);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch(error) {
      console.log(error);
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(cart) {
    return this.stripe.confirmCardPayment(cart.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }

  private async createOrder(cart: ICart) {
    const orderToCreate = this.getOrderToCreate(cart);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(cart: ICart) {
    return {
      cartId: cart.id,
      deliveryId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('shippingAddressForm').value
    }
  }
}
