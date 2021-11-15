import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {AuthActivate} from '../guards/auth.activate';




@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],

  providers: [
    AuthActivate
  ]
})
export class CommonsModule { }
