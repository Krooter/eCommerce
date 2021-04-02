import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    MDBBootstrapModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
