import {Component, Input, OnInit} from '@angular/core';

import {TokenStorageService} from '../../services/user/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  private roles: string[] = [];
  isLoggedIn = false;
  hasAdminRole = false;
  hasUserRole = false;

  constructor( private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.hasAdminRole = this.roles.includes('ROLE_ADMIN');
      this.hasUserRole = this.roles.includes('ROLE_USER');
    } else {
    }

    console.log(this.tokenStorageService.getUser());
    console.log(this.tokenStorageService.isLogged);

  }
}
