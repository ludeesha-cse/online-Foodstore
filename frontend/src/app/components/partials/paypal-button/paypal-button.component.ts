import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent {
  
  @Input() order!: Order;

  
}
