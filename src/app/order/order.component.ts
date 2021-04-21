import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { IOrder } from '../shared/_models/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe((order: IOrder[]) => {
      this.orders = order;
    }, error => {
      console.log(error);
    })
  }

}
