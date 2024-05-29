import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-active-order',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './active-order.component.html',
  styleUrl: './active-order.component.css'
})
export class ActiveOrderComponent {
  private activeOrder: Order;

  constructor(private orderService: OrderService) {
    this.activeOrder = this.orderService.getActiveOrder();
  }

  public getActiveOrder(): Order {
    return this.activeOrder;
  }

  public getTotal(): number {
    return this.activeOrder.products.reduce((acc, p) => acc + p.product.dollarPrice * p.quantity, 0);
  }

  public removeProductFromOrder(product: any): void {
    this.activeOrder.products = this.activeOrder.products.filter(p => p.product.id !== product.id);
  }

  onPlaceOrder(): void {
    if (this.activeOrder.products.length === 0) {
      alert('Please add products to order');
      return;
    }

    this.orderService.addOrder(this.activeOrder).subscribe(
      (response: any) => {
        alert('Order placed successfully');
        this.clearActiveOrder();
        this.orderService.clearActiveOrder();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);

        alert(error.error);
      }
    );

  }

  clearActiveOrder() {
    this.activeOrder = {
        id: -1,
        salesPersonId: this.activeOrder.salesPersonId,
        customerEmail: '',
        products: []
      }
}
}
