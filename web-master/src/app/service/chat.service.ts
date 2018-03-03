import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';

@Injectable()
export class ChatService {
  private url = 'http://ec2-54-154-31-253.eu-west-1.compute.amazonaws.com:9999';
  private socket;

  constructor(
    private authService: AuthService,
    private locationService: LocationService
  ) {
    this.socket = io.connect(this.url, {query: `id=${this.authService.getUid()}&token=${this.authService.getToken()}`});
  }


  sendMessage(user, message) {
    this.locationService.getCoordinates().then(location => {
      this.socket.emit('send-message', {
        message,
        to: user.id,
        location: location,
        date: new Date().getTime(),
      });
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('receive-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
