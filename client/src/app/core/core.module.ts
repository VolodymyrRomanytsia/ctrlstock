import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './classes/token.interceptor';
import { CommonModule } from '@angular/common';

@NgModule ({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        LoaderComponent
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
      ]

})
export class CoreModule { }