import { Injectable } from '@angular/core';
import { Socket,io } from 'socket.io-client';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private apiURl = 'http://localhost:3000'

  constructor(private http: HttpClient){ 
    this.socket = io(this.apiURl)
  }

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURl}/users`);
  }

  login(credentials: { name: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURl}/login`, credentials);
  }

  register(credentials: {name: string, password: string}): Observable<any>{
    return this.http.post<any>(`${this.apiURl}/add`,credentials);
  }

  joinChat(name: string){
    console.log(`${name} joined`)
    this.socket.emit('join',name)
  }

  sendMessage(name: string, message: string){
    this.socket.emit('chat',{name, message})
  }

  

  receiveMessage():Observable<{name:string, message:string}>{
    return new Observable(observer=>{
      this.socket.on('chat-received',(data)=>{
        observer.next(data);
      })
    })
  }

  userJoined(): Observable<string>{
    return new Observable(observer=>{
      this.socket.on('user-joined',(name)=>{
        observer.next(name)
      })
      return ()=>{
        this.socket.off('user-joined')
      }
    })
  }

  userLeft(): Observable<string>{
    return new Observable(observer=>{
      this.socket.on('user-left',(name)=>{
        observer.next(name)
      })
    })
  }
}
