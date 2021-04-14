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

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FontAwesomeModule,
    CarouselModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgxGalleryModule,
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
    ReactiveFormsModule
  ]
})
export class SharedModule { }
