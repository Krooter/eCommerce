import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(clientError => {
        if (clientError){
          if(clientError.status === 400){
            if(clientError.error.errors) {
              throw clientError.error;
            } else {
              this.toastr.error(clientError.error.message, clientError.error.statusCode);
            }
          }
          if(clientError.status === 401){
            this.toastr.error(clientError.error.message, clientError.error.statusCode);
          }
          if (clientError.status === 404){
            this.router.navigateByUrl('/not-found')
          }
          if (clientError.status === 500){
            const navigationExtras: NavigationExtras = {state: {error: clientError.error}}
            this.router.navigateByUrl('/server-error', navigationExtras)
          }
        }
        return throwError(clientError);
      })
    )
  }
}