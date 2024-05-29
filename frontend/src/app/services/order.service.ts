import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/order";
import { Employee } from "../models/employee";
import { AuthenticationService } from "../login/auth.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private activeOrder: Order;
    private salesPerson: Employee;


    private apiServerUrl = 'http://localhost:8080/orders';

    constructor(private authService: AuthenticationService,  private http: HttpClient) {
        this.salesPerson = this.authService.getDecodedToken();

        this.activeOrder = {
            id: -1,
            salesPersonId: this.salesPerson.id,
            customerEmail: '',
            products: []
          }
    }

    getActiveOrder(): Order {
        return this.activeOrder;
    }

    getSalesPerson(): Employee {
        return this.salesPerson;
    }

    addProductToActiveOrder(product: any, quantity: number) {
        if (this.activeOrder.products.some(p => p.product.id === product.id)) {
            this.activeOrder.products.forEach(p => {
                if (p.product.id === product.id) {
                    p.quantity += quantity;
                }
            });
        } else {
            this.activeOrder.products.push({ product, quantity});
        }
        
    }

    clearActiveOrder() {
        this.activeOrder = {
            id: -1,
            salesPersonId: this.salesPerson.id,
            customerEmail: '',
            products: []
          }
    }

    public getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiServerUrl}`);
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiServerUrl}`, order);
    }

    public updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiServerUrl}`, order);
    }

    public deleteOrder(orderId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${orderId}`);
    }
}