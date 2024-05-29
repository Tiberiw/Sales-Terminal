import { Component } from '@angular/core';
import { AuthenticationService } from '../../../login/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService) {}

  public onLogout(): void {
    this.authService.logout();
    window.location.reload();
  }

}
