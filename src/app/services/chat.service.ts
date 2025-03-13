
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  
  // almost working
  private apiUrl = 'http://127.0.0.1:8000/api/chatrooms/';
  private getMessagesUrl = 'http://127.0.0.1:8000/village_GetItemByfield_InputView/village/';

  constructor(private http: HttpClient) {}

  // Fetch messages for a given village
  getMessages(village: string): Observable<any> {
    return this.http.get(`${this.getMessagesUrl}${village}/`);
  }

  // Send a message to the backend
  sendMessage(message: string, user: string, village: string): Observable<any> {
    const payload = { message, user, village };
    return this.http.post(`${this.apiUrl}`, payload);
  }
}