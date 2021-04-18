import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
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
  shippingAddressFrom: FormGroup;
  deliveryForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startTimer();
    this.createShippingAddressForm();
    this.createDeliveryForm();
  }

  createShippingAddressForm(){
    this.shippingAddressFrom = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
    });
  }

  createDeliveryForm(){
    this.deliveryForm = new FormGroup({
      deliveryOption: new FormControl('', Validators.required)
    })
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
