import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/orders.service';
import { Order } from 'src/app/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;
  constructor(private orderService: OrdersService) {
    this.orders$ = orderService.getAll();
  }

  ngOnInit() {
    
  }

}
