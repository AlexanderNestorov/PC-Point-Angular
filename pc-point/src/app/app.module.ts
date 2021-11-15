import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import {UserModule} from "./user/user.module";
import {AuthActivate} from "./guards/auth.activate";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "./commons/commons.module";
import {HomeModule} from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonsModule,
    HomeModule
  ],
  providers: [authInterceptorProviders, AuthActivate],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
