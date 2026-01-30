import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/constant';
import { User } from '../store/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  onLoginSubmit(data:any){
    return this.http.post<User>(`${BASE_URL}/login`,{
      emailId:data.emailId,
      password :data.password
    },{withCredentials:true} );
  }
}
