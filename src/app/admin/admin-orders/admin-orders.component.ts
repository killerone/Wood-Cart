import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;
  constructor(private orderService: OrdersService, private title: Title) {
    this.orders$ = orderService.getAll();
  }

  ngOnInit() {
    this.title.setTitle("Orders");
  }

}
