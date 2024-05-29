import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../../../models/employee';
import { httpJwtInterceptor } from '../../../http-jwt.interceptor';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {  
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  public roles = Object.values(Role);

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
      const results: Employee[] = [];
      for (const employee of this.employees) {
        if (employee.username.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(employee);
        }
      }
      this.employees = results;
      if (results.length === 0 || !key) {
        this.getEmployees();
      }
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    document.getElementById("add-employee-form")?.click();
  }

  public onUpdateEmployee(employee: any): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    document.getElementById("add-employee-form")?.click();
  }

  public onDeleteEmployee(employeeId: any): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    document.getElementById("add-employee-form")?.click();
  }


  public openModal(employee: any, mode: string): void {
    const container = document.getElementById("main-container")
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal')
    } else if (mode === 'update') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }
    container?.appendChild(button);
    button.click();
  }

}
