import { Routes } from '@angular/router';

import { ProductComponent as AdminProductComponent } from './components/admin/product/product.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { ProductComponent as UserProductComponent } from './components/user/product/product.component';
import { OrderComponent } from './components/user/order/order.component';
import { ActiveOrderComponent } from './components/user/active-order/active-order.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, hasRoleGuard] , data: { expectedRole: 'ADMIN' }, children: [
        {path: 'products', component: AdminProductComponent, canActivate: [authGuard]},
        {path: 'employees', component: EmployeeComponent, canActivate: [authGuard]},
        {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]},
    {path: 'user', component: UserDashboardComponent, canActivate: [authGuard, hasRoleGuard], data: { expectedRole: 'USER' }, children: [
        {path: 'products', component: UserProductComponent, canActivate: [authGuard]}, 
        // {path: 'orders', component: OrderComponent, canActivate: [authGuard]}, 
        {path: 'active-order', component: ActiveOrderComponent, canActivate: [authGuard]},
        {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]},
    
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
