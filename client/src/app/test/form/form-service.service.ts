import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  formInfo = {
    name:"",
    age:""
  }

  te=1
  constructor() { }

  get():Observable<any>{
    this.te = this.te +1
    console.log(this.te)
    return of({name:"aaa",te:this.te+1})
  }

}
