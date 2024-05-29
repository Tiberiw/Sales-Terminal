import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './auth.service';
import { AuthenticationRequest } from './authentication.request';
import { AuthenticationResponse } from './authentication.response';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule , HttpClientModule, CommonModule, RouterLink],
  // RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLinkActive, RouterLink
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  errorMsg = [];

  authRequest: AuthenticationRequest = {
    username: "",
    password: ""
  };


  constructor(private authService: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectBasedOnRole(this.authService.token);
    }
  }

  public onLogin(): void {
    this.errorMsg = [];
    this.authService.login(this.authRequest).subscribe(
      (response: AuthenticationResponse) => {
          this.authService.token = response.token as string;
          this.redirectBasedOnRole(this.authService.token);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.errorMsg = error.error.errorMsg;
      }
    )
  }

  public redirectBasedOnRole(token: string): void {
    if (this.authService.isTokenValid()) {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken.role === 'ADMIN') {
        this.router.navigate(['admin']);
        console.log('admin');
      } else if (decodedToken.role === 'USER') {
        this.router.navigate(['user']);
        console.log('user');
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
