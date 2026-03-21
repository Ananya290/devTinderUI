import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserfeedService {

http = inject(HttpClient);
page: number = 1;
 limit: number = 20

getFeedService(){
  console.log("feed service called");
  return this.http.get(BASE_URL+`/user/feed?page=${this.page}&limit=${this.limit}`, {withCredentials:true },


  );



}
onEditProfileService(data: any){

  return this.http.patch(BASE_URL+`/profile/edit`, data, {
   
    withCredentials: true
  });
}

getBaseUrl(): string {
  return BASE_URL;
}

handleRequestService(status:'interested'| 'ignored',touserId:string){
  return this.http.post(BASE_URL+`/request/send/${status}/${touserId}`, {}, {withCredentials:true});
}




}