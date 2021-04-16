import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })
  ],
  exports: [
    FooterComponent,
    NavBarComponent,
    MDBBootstrapModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
