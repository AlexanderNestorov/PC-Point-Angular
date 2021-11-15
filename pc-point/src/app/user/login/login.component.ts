import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { TokenStorageService } from '../../services/user/token-storage.service';

import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private fb: FormBuilder,
              private location: Location) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(formData: any): void {
    const { username, password } = formData.value;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;


        console.log(data);
        this.router.navigateByUrl('/home').then(() => this.reloadPage());
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  back() {
    this.location.back();
  }
}
