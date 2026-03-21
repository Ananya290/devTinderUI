import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  http = inject(HttpClient);

getConnectionsService() {
  console.log("getConnections service called");
  return this.http.get(BASE_URL + '/user/connection', { withCredentials: true }); 
 }
 
 
 getFriendRequestsService() {
  console.log("getFriendRequests service called");
  return this.http.get(BASE_URL + '/user/request/recieved', { withCredentials: true }); 
 }

reviewFriendRequestService(status: 'accepted' | 'rejected', requestId: string) {
  return this.http.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, { withCredentials: true });
}

}
