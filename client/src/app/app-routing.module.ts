import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './core/classes/auth.guard';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'faq', component: FaqPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'reset/:token', component: NewPasswordPageComponent},
  {path: 'user', loadChildren: './user-page/user.module#UserModule' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
