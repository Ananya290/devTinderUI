import  {createEffect, ofType, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as FeedActions from './feed.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserfeedService } from '../../services/user/userfeed.service';

@Injectable()
export class FeedEffects {  

    constructor(private actions$: Actions, private feedService: UserfeedService) {}

    loadFeed$ = createEffect(() =>
    this.actions$.pipe(
        ofType(FeedActions.loadFeed),
        mergeMap(() =>
        this.feedService.getFeedService().pipe(
                map((res: any) => {
                  console.log('API Response:', res);
                  let feedData = [];
                  
                  if (Array.isArray(res?.data)) {
                    feedData = res.data;
                  } else if (Array.isArray(res?.data?.data)) {
                    feedData = res.data.data;
                  } else if (Array.isArray(res)) {
                    feedData = res;
                  }
                  
                  console.log('Extracted Feed Data:', feedData);
                  return FeedActions.loadFeedSuccess({ feed: feedData });
                }),
                catchError(error => {
                  console.error('Feed Error:', error);
                  return of(FeedActions.loadFeedFailure({ error }));
                })
            )
        )

    ))
     }  
