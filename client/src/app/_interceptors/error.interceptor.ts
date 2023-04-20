import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationError, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400:
              console.log("catchError,",error.error)
              if(error.error.errors){
                console.log("400catchError,",error.error.errors)
                const modelStatusErrors = []
                for (const key in error.error.errors){
                  if (error.error.errors[key]) {
                    modelStatusErrors.push(error.error.errors[key])
                  }
                }
                throw modelStatusErrors.flat();
              } else {
                console.log("catchError,",error.error.erros)
                this.toastr.error(error.error, error.status.toString())
              }
              break
            case 401:
              this.toastr.error('Unauthorised', error.status.toString())
              break
            case 404:
              this.router.navigateByUrl('/not-found')
              break
            case 500:
              const navigationExtras:NavigationExtras = {state: {error:error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras)
              break
            default:
              this.toastr.error('Something Error')
              console.log(error)
              break
          }
        }
        throw error
      })
    );
  }
}
