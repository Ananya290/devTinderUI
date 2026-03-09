import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserfeedService {

http = inject(HttpClient);
page: number = 1;
 limit: number = 10

getFeedService(){
  console.log("feed service called");
  return this.http.get(BASE_URL+`/user/feed?page=${this.page}&limit=${this.limit}`, {withCredentials:true },


  );
 


}

}