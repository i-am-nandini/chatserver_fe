import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatService } from './chat.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // almost working
  private socket!: WebSocket;
  private messagesSubject = new Subject<any>();

  constructor() {}

  // Connect to the WebSocket server for a specific village
  connect(village: string) {
    this.socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${village}/`);

    this.socket.onopen = () => {
      console.log(`Connected to WebSocket for village: ${village}`);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messagesSubject.next(data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  // Return observable for incoming messages
  onMessage(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  // Send a message through the WebSocket
  sendMessage(data: { message: string; user: string }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not connected.");
    }
  }
  
}
