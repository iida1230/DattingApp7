import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountSevice: AccountService, private toastr: ToastrService){

  }
  canActivate(
    ): Observable<boolean> {
    return this.accountSevice.currentUserSource$.pipe(
      map(user => {
        if (user) return true
        else{
          this.toastr.error("You shall not pass!")
          return false
        }
      })
    )
  }

}
