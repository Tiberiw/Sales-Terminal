import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Order } from '../../../models/order';
import { Employee } from '../../../models/employee';
import { AuthenticationService } from '../../../login/auth.service';
import { OrderService } from '../../../services/order.service';
import { inject } from '@angular/core';
import { Product } from '../../../models/product';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink, HeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
