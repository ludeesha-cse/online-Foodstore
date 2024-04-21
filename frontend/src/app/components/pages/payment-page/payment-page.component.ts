import { OrderService } from 'src/app/services/order.service';
import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {

  order:Order = new Order();
  
  constructor(OrderService: OrderService, router: Router) {
    OrderService.getNewOrderForCurrentUser().subscribe({
      next: (order)=>{
        this.order = order;
      },
      error: (error)=>{
        router.navigateByUrl('/checkout')
      }
    })
   }

}
