import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {emailValidator, rePasswordValidator} from '../../shared/validators';
import {TokenStorageService} from '../../services/user/token-storage.service';
import {Location} from '@angular/common';
import {MyErrorStateMatcher} from "../../shared/MyErrorStateMatcher";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  rePasswordFormControl = new FormControl('', [Validators.required, rePasswordValidator(this.passwordFormControl)]);
  emailFormControl = new FormControl('', [Validators.required, emailValidator]);

  matcher = new MyErrorStateMatcher();

  form: FormGroup;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder,
              private router: Router, private tokenStorageService: TokenStorageService,
              private location: Location) {
    this.form = this.fb.group({
      usernameFormControl: this.usernameFormControl,
      passwordFormControl: this.passwordFormControl,
      rePasswordFormControl: this.rePasswordFormControl,
      emailFormControl: this.emailFormControl
    });  }

  ngOnInit(): void {
  }

  async onSubmit(formData: any): Promise <any> {

    const username = formData.form.value.usernameFormControl;
    const password = formData.form.value.passwordFormControl;
    const email = formData.form.value.emailFormControl;
    const confirmPassword = formData.form.value.rePasswordFormControl;

    this.authService.register(username, email, password, confirmPassword).subscribe(
      data => {
        this.authService.login(username, password).subscribe(
          data2 => {
            this.tokenStorageService.saveToken(data2.accessToken);
            this.tokenStorageService.saveUser(data2);
            console.log(data2);
            this.router.navigate(['/home']).then(() => this.reloadPage());
            this.isLoggedIn = true;
          },
          error => {
            this.errorMessage = error.error.message;
            this.isLoginFailed = true;
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
