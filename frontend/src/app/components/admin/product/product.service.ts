import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../../models/product";


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiServerUrl = 'http://localhost:8080/products';

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiServerUrl}`);
    }

    public addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiServerUrl}`, product);
    }

    public updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiServerUrl}`, product);
    }

    public deleteProduct(productId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${productId}`);
    }
}