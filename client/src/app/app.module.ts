import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './material';

import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './core/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SolutionPageComponent } from './solution-page/solution-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { TokenInterceptor } from './core/classes/token.interceptor';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderInterceptorService } from './core/services/loader-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomePageComponent,
    SolutionPageComponent,
    RegisterPageComponent,
    LoginComponent,
    LayoutComponent,
    UserPageComponent,
    NewPasswordPageComponent,
    FaqPageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
