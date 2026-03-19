import { createAction, props } from "@ngrx/store";

export const loadFeed = createAction('[Feed] Load Feed');
export const loadFeedSuccess = createAction('[Feed] Load Feed Success', props<{ feed: any[] }>());
export const loadFeedFailure = createAction('[Feed] Load Feed Failure', props<{ error: any }>());


