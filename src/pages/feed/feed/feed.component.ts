import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeed, selectFeedError, selectFeedLoading } from '../../../store/feed/feed.selector';
import * as FeedActions from '../../../store/feed/feed.action';
import { UserfeedService } from '../../../services/user/userfeed.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  store = inject(Store);
  feed$ = this.store.select(selectFeed);
  loading$ = this.store.select(selectFeedLoading);
  error$ = this.store.select(selectFeedError);
  userfeedService = inject(UserfeedService);
  

  ngOnInit(): void {
    this.store.dispatch(FeedActions.loadFeed());
    console.log(this.feed$);

  this.feed$ = this.store.select(selectFeed);
  this.loading$ = this.store.select(selectFeedLoading);
  this.feed$.subscribe(data => console.log(data));

  }

  handleInterest(status: 'interested' | 'ignored', userId: string) {
    console.log(`Sending ${status} request for user with ID: ${userId}`);
    this.userfeedService.handleRequestService(status, userId).subscribe({
      next: (response) => {
        console.log("Request response:", response);
        this.store.dispatch(FeedActions.loadFeed()); 
      },
      error: (error) => {
        console.error("Error sending request:", error);
      }
    });
  }

}
