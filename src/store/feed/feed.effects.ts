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
                map((res: any) =>  FeedActions.loadFeedSuccess({
                  feed: Array.isArray(res?.data) ? res.data : (res?.data?.data ?? [])
                })),
                catchError(error => of(FeedActions.loadFeedFailure({ error })))
            )
        )

    ))
     }  
