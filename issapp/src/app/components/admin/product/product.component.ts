import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];
  public editProduct: Product | undefined;
  public deleteProduct: Product | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProducts(key: string): void {
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
}

public onAddProduct(addForm: NgForm): void {
  this.productService.addProduct(addForm.value).subscribe(
    (response: Product) => {
      console.log(response);
      this.getProducts();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  )
  document.getElementById("add-product-form")?.click();
}

public onUpdateProduct(product: any): void {
  this.productService.updateProduct(product).subscribe(
    (response: Product) => {
      console.log(response);
      this.getProducts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  document.getElementById("update-product-form")?.click();
}

public onDeleteProduct(productId: any): void {
  this.productService.deleteProduct(productId).subscribe(
    (response: void) => {
      console.log(response);
      this.getProducts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  document.getElementById("add-product-form")?.click();
}

public openModal(product: any, mode: string): void {
  const container = document.getElementById("main-container")
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addProductModal')
  } else if (mode === 'update') {
    this.editProduct = product;
    button.setAttribute('data-target', '#updateProductModal')
  } else if (mode === 'delete') {
    this.deleteProduct = product;
    button.setAttribute('data-target', '#deleteProductModal')
  }
  container?.appendChild(button);
  button.click();
}


}
