import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  messages: any;
  text = '';
  msgs:any = [];

  constructor(
    private authService: AuthService,
    private ChatService: ChatService,
    private firestore: AngularFirestore
    ) { }
        
  ngOnInit(): void {
    this.foo()
  
  }

  foo() {
    let ms: any = []
    this.firestore.collection('messages')
      .ref
        .onSnapshot((querySnapshot) => {  
          querySnapshot.forEach((doc: any) => {
          ms.push(
          { 
            data: doc.data().data,
            user: doc.data().user, 
            text: doc.data().text, 
          }
        );
      });
    });
    this.msgs = ms;
    console.log(this.msgs);
  }

  send() {
    console.log(this.text);
    this.ChatService.sendMessage(this.text);
    this.foo()
  }
}
