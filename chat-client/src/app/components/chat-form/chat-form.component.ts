import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent {
  name: string = '';
  password: string = '';

  constructor(private router: Router, private socketService: SocketService) { }

  onSend() {
    if (this.name && this.password) {
      this.socketService.login({ name: this.name, password: this.password }).subscribe(
        (data) => {
          if (data && data.msg === 'Login Successfull') {
            this.router.navigate(['/chat-room'], { state: { name: this.name } });  // Pass name via router state
          } else {
            alert('Invalid Credentials');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred while logging in. Please try again later.');
        }
      );
    } else {
      alert('Please enter both name and password');
    }
  }
}
