import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from './feed.reducers';    

export const selectFeedState = createFeatureSelector<FeedState>('feed');
export const selectFeed = createSelector(selectFeedState, state => state.feed);
export const selectFeedLoading = createSelector(selectFeedState, state => state.loading);
export const selectFeedError = createSelector(selectFeedState, state => state.error);

