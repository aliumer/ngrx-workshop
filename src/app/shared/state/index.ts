import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromBooks from "./books.reducer";
import * as fromAuth from './auth.reducer';
import { create } from "domain";
import { logoutMetareducer } from "./logout.metareducer";

export interface State {
    auth: fromAuth.State;
    books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [
    logoutMetareducer
];


export const selectBooksState = (state: State) => state.books;

export const selectActiveBook = createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
);

export const selectAllBooks = createSelector(
    selectBooksState,
    fromBooks.selectAll
);

export const selectBooksEarningsTotal = createSelector(
    selectBooksState,
    fromBooks.selectEarningsTotal
);

/**
 * auth selectors
 */

export const selectAuthState = (state: State) => state.auth;
export const selectGettingAuthStatus = createSelector(
    selectAuthState,
    fromAuth.selectGettingStatus
);
export const selectAuthUser = createSelector(
    selectAuthState,
    fromAuth.selectUser
);
export const selectAuthError = createSelector(
    selectAuthState,
    fromAuth.selectError
);
