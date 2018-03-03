import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';
import { MessagesService} from '../service/messages.service';
import { LocationService} from '../service/location.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  data;
  users;
  msgs;
  mainUser = localStorage.getItem('currentUser');
  showMenu = true;
  notification = null;


  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private messagesService: MessagesService,
    private locationService: LocationService,
    private router: Router
  ) { }



    toggleMenu() {
      this.showMenu = !this.showMenu;
    }

    showNotify(name, message) {
      this.notification = {
        user: this.users.find(u => u.id === name),
        name,
        message,
      };

      setTimeout(() => {
        this.notification = null;
      }, 7000);
    }

    getPeople() {
    this.userService.getUsers().then(res => {
      this.users = res.data;

      for(var i = 0; i <= this.users.length - 1; i++){
        if(this.users[i].avatar == 'none'){
          this.users[i].avatar = 'https://vignette2.wikia.nocookie.net/angrybirds/images/3/36/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%B7%D0%BE%D0%BC%D0%B1%D0%B8_%D0%B8%D0%B7_%D1%82%D1%83%D1%80%D0%BD%D0%B8%D1%80%D0%B0.png/revision/latest?cb=20131023095813&path-prefix=ru';
        }
      }
      console.log('users', this.users);
    })
  }

    crushToken(){
    this.mainUser = JSON.parse(this.mainUser);
  }

    friendSelect(friend: any): void {
    console.log("friend", friend);
    this.data = friend;
    this.msgs = this.messagesService.chat_histories[friend.id]
      .sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp));
    this.showMenu = false;
    setTimeout(() => {
      const objDiv = document.getElementById("chat-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    },10);

  }

  onLogout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("numUid");
    this.router.navigate(['/login']);
    console.log('logout', localStorage);
  }


  ngOnInit() {
    this.crushToken();
    this.getPeople();
    this.locationService.getCoordinates();
    console.log('ololo', this.mainUser);

    this.chatService.getMessages().subscribe(message => {
      console.log('getMessages', message);
      // this.messages.push(message);
    })

    this.chatService.getMessages().subscribe((message: any) => {
      console.log('getMessages', message);
      this.messagesService.updateHistory(message.sender, message);
      this.showNotify(message.sender, message.msg);

    });
  }
}
