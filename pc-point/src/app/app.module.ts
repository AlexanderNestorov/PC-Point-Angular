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
import {ProductAllComponent} from "./product/product-all/product-all.component";
import {ProductModule} from "./product/product.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {OrderModule} from "./order/order.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    LocationHomeComponent,
    ProductAllComponent
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
    ProductModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [authInterceptorProviders, AuthActivate],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
