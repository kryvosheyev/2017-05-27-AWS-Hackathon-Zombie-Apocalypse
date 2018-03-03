import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:boolean = true;
  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  onChange(){
    this.form == false ? this.form = true : this.form = false;

    console.log(this.form);
  }

  onRegister(){
    console.log('register', this.user);
    // this.userService.register(this.user)
  }

  onLogin(){
    console.log('login', this.user);

        let user = this.user;
    this.userService.login(user.id, user.password)
      .subscribe(response => {

        console.log(response);
        let user = response.data;
        this.authService.setUser(user);

        let token = user.token;
        let uid = user.id;
        // let user = response.user.username;

        this.authService.setToken(token);
        this.authService.setUid(uid);
        location.reload();
        this.router.navigate(['/home']);

      }, err => {
        console.log(err);
      })
  }



  ngOnInit() {
  }

}
