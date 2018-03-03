import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../user/user';

import { environment } from './../../environments/environment';

@Injectable()
export class MessagesService {

  headers = new Headers({
    "Content-Type": "application/json",
    'AuthToken': this.authService.getToken(),
  });

  access_token = localStorage.getItem('token');
  chat_histories = {};

  constructor(
    private http: Http,
    private authService: AuthService,
  ) { }

  getChat(id) {
    return this.chat_histories[id].sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10));
  }

  getChatHistories(users: any, timestamp = null, limit = 10) {
    const promises = users.map(user_id => {
      return this.http.post('https://49t6art088.execute-api.eu-west-1.amazonaws.com/dev/get-all-messages', {
        receiver: user_id,
        limit,
        timestamp,
      }, {headers: this.headers}).toPromise()
        .then(res => { return res.json(); })
        .then(messagesRsp => {
          this.chat_histories[user_id] = messagesRsp.data.sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10));
          return true;
        });
    });

    return Promise.all(promises);
  }

  updateHistory(user_id, message) {
    this.chat_histories[user_id].push(message);
    this.chat_histories[user_id] = this.chat_histories[user_id].sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10));
    const objDiv = document.getElementById("chat-messages");
    console.log(this.chat_histories);
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  // login(id: string, password: string): Observable<any> {
  //
  //   let url = 'https://49t6art088.execute-api.eu-west-1.amazonaws.com/dev/login';
  //
  //   return this.http.post(url, { id: id, password: password })
  //     .map(res => res.json())
  //     .catch(err => {
  //       return Observable.throw(err);
  //     })
  // }
  //
  // getUsers(): any {
  //   let url = 'https://49t6art088.execute-api.eu-west-1.amazonaws.com/dev/friendsgetall';
  //   return this.http.get(url, {headers: this.headers})
  //     .toPromise().then(res => { return res.json(); })
  //     .catch(err => {
  //       return console.log(err);
  //     });
  // }

}
