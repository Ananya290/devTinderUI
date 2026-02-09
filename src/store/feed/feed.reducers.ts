import { createReducer, on } from "@ngrx/store";
import * as FeedActions from "./feed.action";

export interface FeedState {
  feed: any[];
  loading: boolean;
  error: any;
}

export const initialState: FeedState = {
  feed: [],
  loading: false,
  error: null
};

export const feedReducer = createReducer(initialState,
    on(FeedActions.loadFeed,state=> ({...state, loading: true, error: null})),
    on(FeedActions.loadFeedSuccess,(state, { feed }) => ({...state, feed, loading: false})),
    on(FeedActions.loadFeedFailure,(state, { error }) => ({...state, error, loading: false}))
)