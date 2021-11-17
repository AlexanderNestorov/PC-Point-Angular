import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./commons/not-found/not-found.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AuthActivate} from "./guards/auth.activate";
import {HomeComponent} from "./home/home/home.component";
import {AboutComponent} from "./home/about/about.component";
import {LocationHomeComponent} from "./location/location-home/location-home.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component : AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'locations',
    component: LocationHomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: 'login'
    }
  },
  {
    path: '**',
    component : NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
