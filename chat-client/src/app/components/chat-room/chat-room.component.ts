import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  name: string = '';
  message: string = '';
  messages: { name: string; message: string }[] = [];
  users: string[] = [];

  constructor(private router: Router, private socketService: SocketService) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('chatUser') || ''; 

    if (!this.name) {
      this.router.navigate(['/']); 
      return;
    }

    this.socketService.joinChat(this.name);
    // Listen for incoming messages
    this.socketService.receiveMessage().subscribe((data) => {
      this.messages.push(data);
    });

    // Listen for users joining
    this.socketService.userJoined().subscribe((user) => {
      this.users.push(user);
    });

    // Listen for users leaving
    this.socketService.userLeft().subscribe((user) => {
      const index = this.users.indexOf(user);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.socketService.sendMessage(this.name, this.message);
      // this.messages.push({ name: this.name, message: this.message });
      this.message = '';
    } else {
      alert('Please type a message');
    }
  }

  onLogout(): void {
    this.router.navigate(['/']); 
    sessionStorage.removeItem('chatUser')
  }
}
