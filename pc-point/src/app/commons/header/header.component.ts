import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/user/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  isLoggedUserAdmin = false;
  isLoggedUserUser = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isLoggedUserAdmin = this.roles.includes('ROLE_ADMIN');
      this.isLoggedUserUser = this.roles.includes('ROLE_USER');

      this.username = user.username;

    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    window.alert('Logged out');
  }
}
