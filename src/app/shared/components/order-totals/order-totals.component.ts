import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { ICartTotals } from '../../_models/cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  cartTotals$: Observable<ICartTotals>;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartTotals$ = this.cartService.cartTotal$;
  }
}
