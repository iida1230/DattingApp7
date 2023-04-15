import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/use';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:5001/api/";

  //そのまま渡すとnext()メソッドが使える
  private currentUserSource = new BehaviorSubject<User | null>(null);
  // asObservable()でSubjectをObservableに変換してnext()メソッドを使えない状態にしてから渡たす
  currentUserSource$ = this.currentUserSource.asObservable()
  constructor(private http: HttpClient) {
    console.log("AccountService__construct")

  }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any){
    console.log("register",model)
    //pipもsubscribeしないと発火しない
      return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user => {
        if(user){
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // map関数内の値を呼び出し元のsubscribeでも使用したい場合はmapメソッド内でもreturnする必要がある
        return user;
      })

    )

  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }


}