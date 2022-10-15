import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";

const BOOKS_LOAD_SUCCESS = "[Books Api] Books Loaded Success";
const BOOK_CREATED_SUCCESS = "[Books Api] Books Created Success";
const BOOK_UPDATED_SUCCESS = "[Books Api] Books Updated Success";
const BOOK_DELETED_SUCCESS = "[Books Api] Books Deleted Success";

export const booksLoadedSuccessfully = createAction(
    BOOKS_LOAD_SUCCESS,
    props<{ books: BookModel[]}>()
);

export const bookCreatedSuccessfully = createAction(
    BOOK_CREATED_SUCCESS,
    props<{ book: BookModel}>()
);

export const bookUpdatedSuccessfully = createAction(
    BOOK_UPDATED_SUCCESS,
    props<{ book: BookModel}>()
);

export const bookDeletedSuccessfully = createAction(
    BOOK_DELETED_SUCCESS,
    props<{ bookId: string}>()
);
