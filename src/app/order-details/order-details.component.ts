import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../service/orders.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  id: string;
  order;
  feedBack = "";
  status = "";
  isAdmin = false;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private title:Title) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.orderService.get(this.id).subscribe(item => {
      this.order = item;
      this.feedBack = this.order.feedBack;
      this.status = this.order.status;
    })
  }

  ngOnInit() {
    this.isAdmin = (localStorage.getItem("isAdmin") == 'true');
    this.title.setTitle("Order Details")
  }
  addFeedback() {
    this.orderService.updateFeedback(this.id, this.feedBack);
  }

  updateStatus() {
    this.orderService.updateStatus(this.id);
  }
}
