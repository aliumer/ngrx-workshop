import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";

const BOOKS_PAGE_ENTER = "[Books Page] Enter";
const BOOKS_PAGE_SELECT = "[Books Page] Select";
const BOOKS_PAGE_CREATE = "[Books Page] Create a Book";
const BOOKS_PAGE_UPDATE = "[Books Page] Update a Book";
const BOOKS_PAGE_DELETE = "[Books Page] Delete a Book";
const BOOKS_PAGE_CANCEL = "[Books Page] Cancel Editing";
const BOOKS_PAGE_CLEAR_SELECTED_BOOK = "[Books Page] Clear Selected Book";

export const enterBooksPage = createAction(BOOKS_PAGE_ENTER);

export const selectBook = createAction (
  BOOKS_PAGE_SELECT,
  props<{ bookId: string }>()
);

export const clearSelectedBook = createAction (BOOKS_PAGE_CLEAR_SELECTED_BOOK);

export const createBook = createAction (
  BOOKS_PAGE_CREATE,
  props<{ book: BookRequiredProps }>()
);

export const updateBook = createAction (
  BOOKS_PAGE_UPDATE,
  props<{ bookId: string; changes: BookRequiredProps }>()
);

export const deleteBook = createAction (
  BOOKS_PAGE_DELETE,
  props<{ bookId: string }>()
);

export const cancelBook = createAction(BOOKS_PAGE_CANCEL);
