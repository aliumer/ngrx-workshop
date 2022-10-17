import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";


const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) => {
    return books.map(book => {
        return book.id === changes.id ? Object.assign({}, book, changes): book;
    })
};
const deleteBook = (books: BookModel[], bookId: string) => books.filter(book => bookId !== book.id);

export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
}

const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
  activeBookId: null
})

export const booksReducer = createReducer(
  initialState,
  on(
    BooksPageActions.enterBooksPage,
    BooksPageActions.clearSelectedBook, (state, action) => {
    return {
      ...state,
      activeBookId: null,
    };
  }), 
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId,
    };
  }),
  on(BooksApiActions.booksLoadedSuccessfully, (state, action) => {
    return adapter.addMany(action.books, state)
    // return {
    //     ...state, 
    //     collection: action.books
    // };
  }),
  on(BooksApiActions.bookDeletedSuccessfully, (state, action) => {
    return adapter.removeOne(action.bookId, state);
    // return {
    //     ...state, 
    //     collection: deleteBook(state.collection, action.bookId)
    // }
  }),
  on(BooksApiActions.bookCreatedSuccessfully, (state, action) => {
      return adapter.addOne(action.book, {
        ...state,
        activeBookId: null
      })
    // return {
    //     collection: createBook(state.collection, action.book),
    //     activeBookId: null
    // };
  }),
  on(BooksApiActions.bookUpdatedSuccessfully, (state, action) => {
      return adapter.updateOne({ id: action.book.id, changes: action.book }, {
        ...state,
        activeBookId: null
      })
    // return { 
    //     collection: updateBook(state.collection, action.book),
    //     activeBookId: null
    // };
  })
);

export function reducer(state: undefined | State, action: Action) {
    return booksReducer(state, action);
}


// getter selector that returns a property because they just get or drill down to a property in state.
export const { selectAll, selectEntities } = adapter.getSelectors();
//  export const selectAll = (state: State) => state.collection;
 export const selectActiveBookId = (state: State) => state.activeBookId;

 // complex selectors (that combines selectors together to produce more complex result)

 export const selectActiveBook_unoptimized = (state: State) => {
    // inputs
    const books = selectAll(state);
    const activeBookId = selectActiveBookId(state);

    // computation
    return books.find(book => book.id === activeBookId);
 };

// optimized form
export const selectActiveBook = createSelector(
    selectEntities,
    selectActiveBookId,
    (entities, activeBookId) => {
        return activeBookId ? entities[activeBookId] : null
    }
);

export const selectEarningsTotal = createSelector(
    selectAll,
    calculateBooksGrossEarnings
);

/*
export const selectEarningsTotal = createSelector(
    selectAll,
    (books) =>  calculateBooksGrossEarnings(books)
);
export const selectEarningsTotal = createSelector(
    selectAll,
    calculateBooksGrossEarnings
);

*/
