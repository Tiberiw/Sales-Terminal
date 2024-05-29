import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { WebSocketService } from '../../../services/websocket.service';
import { ProductService } from '../../../services/product.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../models/employee';
import { AuthenticationService } from '../../../login/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
    products: Product[] = [];
    modalItem: any;
    salesPerson: Employee;


    constructor(private webSocketService: WebSocketService, private productService: ProductService, private orderService: OrderService) {
      this.salesPerson = this.orderService.getSalesPerson();
    }

    ngOnInit(): void {


      this.webSocketService.getProductUpdates().subscribe((product: Product) => {
        //Update the product list with the new product data
        const index = this.products.findIndex(p => p.id === product.id);
        if (index === -1) {
          this.products.push(product);
        } else {
          this.products[index] = product;
        }
      });

      //Load initial product list from REST API
      this.loadProducts();
    }



    loadProducts(): void {
      this.productService.getProducts().subscribe(
        (response: Product[]) => {
          this.products = response.sort((a, b) => a.id - b.id);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    onAddItemToOrder(): void {

      console.log(this.modalItem);
      let input = document.getElementById('quantity') as HTMLInputElement;
      let quantity = parseInt(input.value);
      this.orderService.addProductToActiveOrder(this.modalItem, quantity);

      //WHAT?
      
      input.value = '0';
      // this.modalItem = null;
      // this.onItemChange();
    }

    onItemChange(): void {
        console.log('trigger')
        let errorField = document.getElementById('quantity-error');
        let input = document.getElementById('quantity') as HTMLInputElement;
        errorField!.innerHTML = '';
        let addToOrderButton = document.getElementById('addToOrderButton');
        addToOrderButton!.removeAttribute('disabled');
        if (this.modalItem.quantity < input.value) {
          errorField!.innerHTML = 'insufficient quantity in stock';
          addToOrderButton?.setAttribute('disabled', 'true');

        }
    }


    public openModal(product: Product): void {
      const container = document.getElementById("container-modal")
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#productUnitsModal')
      this.modalItem = product;
      container?.appendChild(button);
      button.click();
    }


}
