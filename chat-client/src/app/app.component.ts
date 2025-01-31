import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

interface User{
  name:string;
  message:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'chat-client';
  
}
