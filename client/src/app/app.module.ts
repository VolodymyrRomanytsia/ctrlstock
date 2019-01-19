import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './material';

import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './core/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginComponent,
    LayoutComponent,
    NewPasswordPageComponent,
    FaqPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
