import { Component, inject, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/user/connection.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.css',
})
export class FriendRequestComponent implements OnInit {
  connectionService = inject(ConnectionService);
  router = inject(Router);
  loading: boolean = false;
  friendRequests: any[] = [];
  error: any;

  ngOnInit(): void {
    this.getFriendRequests();
  }
  getFriendRequests() {
    this.connectionService.getFriendRequestsService().subscribe({
      next: (response: any) => {
        this.friendRequests = response.connectionRequest || [];
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        this.error = error.message;
      },
    });
  }

  reviewFriendRequest(status: 'accepted' | 'rejected', requestId: string  ) {
    console.log("Reviewing friend request with ID:", requestId, "Status:", status);
    this.connectionService.reviewFriendRequestService(status,requestId).subscribe((res) => {
      console.log("Friend request review response:", res);
      this.getFriendRequests(); // Refresh the friend requests list after review
      this.router.navigate(['/connection']); // Navigate to the connections page after review
    })
   

  }


}
