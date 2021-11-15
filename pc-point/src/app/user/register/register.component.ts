import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {emailValidator, rePasswordValidator} from '../../shared/validators';
import {TokenStorageService} from '../../services/user/token-storage.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  passwordControl: FormControl;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder,
              private router: Router, private tokenStorageService: TokenStorageService,
              private location: Location) {
    this.passwordControl = this.fb.control('', [Validators.required, Validators.minLength(4)]);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, emailValidator]],
      password: this.passwordControl,
      confirmPassword: ['', rePasswordValidator(this.passwordControl)]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(formData: any): Promise <any> {
    const {username, email, password, confirmPassword}  = formData.value;

    this.authService.register(username, email, password, confirmPassword).subscribe(
      data => {
        this.authService.login(username, password).subscribe(
          data2 => {
            this.tokenStorageService.saveToken(data2.accessToken);
            this.tokenStorageService.saveUser(data2);
            console.log(data2);
            this.router.navigate(['/home']).then(() => this.reloadPage());
          },
          error => {
            this.errorMessage = error.error.message;
            this.isSignUpFailed = true;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
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
