import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegster= new EventEmitter();
  model:any= {}

  constructor(private accountService : AccountService, private toastr: ToastrService) {

   }

  ngOnInit(): void {
  }

  register(){
    //subscribeしないとAPIも呼ばれない
    this.accountService.register(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.cancel()
      },
      error: error => this.toastr.error(error.error)
    })
  }

  cancel(){
    this.cancelRegster.emit(false);
  }

}
