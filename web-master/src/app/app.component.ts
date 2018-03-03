import { Component, Input } from '@angular/core';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input() userInfo;
 

  user: User = new User();
  logged: boolean = false;


    constructor(
    private authService:AuthService,
    private userService: UserService,
    private router: Router
  ){

    // this.userService.access_token
      
    // console.log(this.userInfo);

    this.user = this.authService.getCurrentUser();
    if(this.user && this.user !== null && this.user !== undefined){
      this.logged = true;
    }
  }

  onLogout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("numUid");
    console.log('logout', localStorage);
  }

}
