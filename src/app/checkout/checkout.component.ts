import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { CartService } from '../cart/cart.service';
import { IUser } from '../shared/_models/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  timerSec: number = 59;
  timerMin: number = 9;
  interval: any;
  checkoutForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService, private cartService: CartService) { }

  ngOnInit(): void {
    //this.startTimer();
    this.createCheckOutForm();
    this.getAddressFormValues();
    this.getDeliveryValue();
  }

  createCheckOutForm(){
    this.checkoutForm = this.fb.group({
      shippingAddressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: ['', Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['', Validators.required]
      })
    });
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address => {
      if(address) {
        this.checkoutForm.get('shippingAddressForm').patchValue(address);
      }
    }, error => {
      console.log(error)
    });
  }

  getDeliveryValue(){
    const cart = this.cartService.getCurrentCartValue();
    if (cart?.deliveryId !== null){
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(cart.deliveryId.toString());
    }
  }

  ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      if(this.timerMin === 0 && this.timerSec === 0){
        this.router.navigateByUrl("/shop");
      }
    }, 500);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timerSec >= 1) {
        this.timerSec--;
      } else {
        this.timerSec = 59;
      }
    },1000)
    this.interval = setInterval(() => {
      if(this.timerMin > 0){
        this.timerMin--;
      }
    }, 60000);
  }
}
