import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // messages: Observable<any[]>

  constructor(private firestore: AngularFirestore) {
    // this.messages = firestore.collection('messages').valueChanges();
  }

  sendMessage(text: string): Promise<any> {
    let data = {
      text: text,
      user: 'q',
      data: Date.now().toString(),
    }
    return this.firestore.collection('messages').add(data)
    .then(() => {
      console.log('success');
    })
    .catch(error => {
      console.log('error', error);
    });
  }
}
