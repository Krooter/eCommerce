import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component'

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent, TextInputComponent, StepperComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FontAwesomeModule,
    CarouselModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgxGalleryModule,
    CdkStepperModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    FontAwesomeModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    MDBBootstrapModule,
    NgxGalleryModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    CdkStepperModule,
    TextInputComponent,
    StepperComponent
  ]
})
export class SharedModule { }
