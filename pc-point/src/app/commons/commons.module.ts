import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {AuthActivate} from '../guards/auth.activate';
import { FooterComponent } from './footer/footer.component';
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "angular/material/icon";
import {MatFormFieldModule} from "angular/material/form-field";
import {MatInputModule} from "angular/material/input";
import {MatExpansionModule} from "angular/material/expansion";
import {MatButtonModule} from "angular/material/button";




@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbDropdownModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    NgbCollapseModule,
    MatButtonModule
  ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],

  providers: [
    AuthActivate
  ]
})
export class CommonsModule { }
