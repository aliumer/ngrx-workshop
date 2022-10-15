import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";



@Injectable()
export class BooksApiEffects {
    constructor(
        private actions$: Actions,
        private booksService: BooksService
    ) {}

    // we have to return an Observable of actions here.
    // and ngRx is going to subscribe to this observable at run time.
    // and will dispatch all the actions that this observable emits.
    getAllBooks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.enterBooksPage),
            mergeMap(action => {
                // this service.all method does not return an Observable of action. 
                // so we have to further map this service.all to return an Observable of action.
                return this.booksService.all().pipe(
                    map(books => BooksApiActions.booksLoadedSuccessfully({ books }))
                )
            })
        )
    })
}