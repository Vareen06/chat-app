import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  name: string = '';  // Name of the user
  message: string = '';  // Current message to be sent
  messages: { name: string, message: string }[] = [];  // List of messages
  users: string[] = [];  // List of users in the chat
  isNameSet: boolean = false;  // Flag to check if user has set their name

  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
    // Listen for incoming messages and update the messages list
    this.socketService.receiveMessage().subscribe((data) => {
      this.messages.push(data);  // Add the new message
    });

    // Listen for user joining and update the users list
    this.socketService.userJoined().subscribe((user) => {
      this.users.push(user);
    });

    // Listen for user leaving and remove them from the users list
    this.socketService.userLeft().subscribe((user) => {
      const index = this.users.indexOf(user);
      if (index > -1) {
        this.users.splice(index, 1);  // Remove the user
      }
    });
  }

  // Set the user's name and join the chat room
  setName(): void {
    if (this.name.trim() !== '') {
      this.isNameSet = true;
      this.socketService.joinChat(this.name);  // Emit to the server to join the chat
    } else {
      alert('Please enter a name');
    }
  }

  // Send a message to the chat room
  sendMessage(): void {
    if (this.message.trim() !== '' && this.isNameSet) {
      this.socketService.sendMessage(this.name, this.message);  // Send message to the server
      this.message = '';  // Clear the input field after sending
    } else {
      alert('Please set your name and type a message');
    }
  }

  // Logout and navigate to the login page
  logout(): void {
    // this.socketService.leaveChat(this.name);  // Emit to leave the chat
    this.router.navigate(['/']);  // Navigate to login page
  }
}
