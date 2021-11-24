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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from "@agm/core";
import {LocationHomeComponent} from "./location/location-home/location-home.component";
import {LocationModule} from "./location/location.module";

@NgModule({
  declarations: [
    AppComponent,
    LocationHomeComponent
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
    HomeModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNdqMVBT9T-w9zeb7qFM4riL_4xNO_2o',
      libraries: ['places']
    }),
    LocationModule,
  ],
  providers: [authInterceptorProviders, AuthActivate],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
