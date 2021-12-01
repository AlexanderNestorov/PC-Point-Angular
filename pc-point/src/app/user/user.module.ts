import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthActivate} from "../guards/auth.activate";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonsModule} from "../commons/commons.module";
import {ReviewModule} from "../review/review.module";
import {OrderModule} from "../order/order.module";
import {_MatMenuDirectivesModule, MatMenuModule} from "angular/material/menu";
import {MatExpansionModule} from "angular/material/expansion";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonsModule,
    ReviewModule,
    OrderModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class UserModule { }
