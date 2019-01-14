import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SolutionPageComponent } from './solution-page/solution-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './core/classes/auth.guard';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'solution', component: SolutionPageComponent},
  {path: 'faq', component: FaqPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'reset/:token', component: NewPasswordPageComponent},
  {path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
