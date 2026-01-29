import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  onLoginSubmit(data:any){
    return this.http.post("http://localhost:7000/login",{
      emailId:data.emailId,
      password :data.password
    },{withCredentials:true} );
  }
}
