import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { MessagesService } from '../service/messages.service';
import { LocationService } from '../service/location.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() user;
  @Input() messages;
  @Input() currentUser;

  connection;
  message;


  constructor(
    private chatService:ChatService,
    private messagesService: MessagesService,
    private locationService: LocationService,
  ) {

  }


  keyDownFunction(event) {
    if(event.keyCode == 13) {
      alert('you just clicked enter');
      // rest of your code
    }
  }

  sendMessage(){
    const m = {
      sender: this.currentUser.id,
      receiver: this.user.id,
      location: {},
      msg: this.message,
      timestamp: new Date().getTime(),
    };

    if (this.message === '') {
      return;
    }

    this.messagesService.updateHistory(this.user.id, m);
    this.chatService.sendMessage(this.user, this.message);

    setTimeout(() => {
      const objDiv = document.getElementById("chat-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    },10);


    this.message = '';
  }


  ngOnInit() {


  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }


}
