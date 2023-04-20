import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/use';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountSevice:AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  login() {
    console.log(this.model)
    this.accountSevice.login(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.router.navigateByUrl("/members")
      },
      // error: error => this.toastr.error(error.error)
    })
  }

  logout(){
    this.accountSevice.logout()
    this.router.navigateByUrl("/")
  }

}
