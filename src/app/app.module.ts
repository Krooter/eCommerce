import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
