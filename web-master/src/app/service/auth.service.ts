import {Injectable} from '@angular/core';
import {User} from "../user/user";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AuthService {

  mainUser = localStorage.getItem('currentUser');

  public onAuthChange$: Subject<User>;
  constructor() {
    this.onAuthChange$ = new Subject();
  }

  setUser(user: User) {

    this.onAuthChange$.next(user);

    let userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);

  }

  getCurrentUser(): User {

    let userString = localStorage.getItem("currentUser");
    // console.log('currentUser', userString);
    if(userString !== null && userString !== undefined){
      let user: User = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  setUid(numUid: string) {
    localStorage.setItem("numUid", numUid);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }
    getUid(): string {
    return localStorage.getItem("numUid");
  }

  isLoggedIn(): any {
 	  return this.getToken() !== null;
  };

//   logout(){

//     this.onAuthChange$.next(null);
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//     localStorage.removeItem("numUid");

//   }

}