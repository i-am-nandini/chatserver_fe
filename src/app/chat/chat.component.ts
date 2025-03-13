import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { WebsocketService } from '../services/websocket.service';
// src/app/models/chat-message.model.ts
export interface ChatMessage {
  user: string;
  message: string;
  village_id: string;
  timestamp?: string; // Add any additional fields your backend returns
}




@Component({
  selector: 'app-chat',
  standalone: true, // Required for standalone components
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // Fixed typo
})
export class ChatComponent implements OnInit {
 

  village = '';
  currentUser = '';
  messages: any[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.village = params['village'];
      this.currentUser = params['user'];
      this.wsService.connect(this.village);
      this.loadMessages();
  
      // Fetch messages every 5 seconds
      setInterval(() => {
        this.loadMessages();
      }, 1000);
    });
  
    // WebSocket real-time update
    this.wsService.onMessage().subscribe((msg) => {
      console.log("New WebSocket message:", msg);
      this.messages = [...this.messages, msg];
    });
  }
  
  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.village = params['village'];
  //     this.currentUser = params['user'];
  //     this.wsService.connect(this.village);
  //     this.loadMessages();
  //   });

  //   // Subscribe to real-time messages from WebSocket
  //   this.wsService.onMessage().subscribe((msg) => {
  //     this.messages.push(msg);
  //   });
  // }

  // Load past messages from the server
  loadMessages() {
    this.chatService.getMessages(this.village).subscribe((data) => {
      this.messages = data;
    });
  }

  // Send message using both WebSocket and HTTP POST
  sendMessage() {
    if (this.newMessage.trim()) {
      const payload = { message: this.newMessage, user: this.currentUser };
      this.wsService.sendMessage(payload);
      this.chatService.sendMessage(this.newMessage, this.currentUser, this.village)
        .subscribe(() => {
          // Optionally, update messages locally after sending
          this.messages.push(payload);
        });
      this.newMessage = '';
    }
  }
}
