 import { Injectable } from '@angular/core';
 import { CanActivate } from '@angular/router';
 import { AuthService } from './auth.service';
 import { Router } from '@angular/router';

 @Injectable()
 export class AuthGuard implements CanActivate {
 constructor(private authService: AuthService , private router:Router) {}

 canActivate(): any {
   if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/login');
      return false
   }else{
    return true;
   }
 }
}