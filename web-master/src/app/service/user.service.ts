import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';
import { User } from '../user/user';

import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

   headers = new Headers({
    "Content-Type": "application/json",
    'AuthToken': this.authService.getToken(),
  });

//   serverUrl = environment.serviceUrl + environment.serviceAPIPath;
    access_token = localStorage.getItem('token');

  constructor(
    private http: Http,
    private authService: AuthService,
    private messagesService: MessagesService,
    ) { }

  login(id: string, password: string): Observable<any> {

    let url = 'https://49t6art088.execute-api.eu-west-1.amazonaws.com/dev/login';

    return this.http.post(url, { id: id, password: password })
      .map(res => {

        setInterval(() => {
          localStorage.setItem("lastConnect", new Date().getTime().toString());
        }, 100);
        return res.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
  }

    getUsers(): any {
        let url = 'https://49t6art088.execute-api.eu-west-1.amazonaws.com/dev/friendsgetall';
        return this.http.get(url, {headers: this.headers})
            .toPromise().then(res => {
              const data = res.json();
              const lastVisit = localStorage.getItem('lastConnect');
              console.log('Last visit at', lastVisit);
              return this.messagesService.getChatHistories(
                data.data.map(user => user.id)
              ).then(() => data);
            })
            .catch(err => {
                return console.log(err);
            });
    }

//   register(user:User): Observable<any>{
//       let url = '';
//       this.headers.delete('Authorization');

//       return this.http.post(url, user, {headers: this.headers})
//         .map(res => res.json())
//         .catch(err => {
//             return Observable.throw(err);
//         })
//   }
}
