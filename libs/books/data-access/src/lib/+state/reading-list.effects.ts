import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => {
            this.openSnackBarUndoAdd(book);
            return ReadingListActions.addToReadingListSuccess({ book })
          }),
          catchError(() =>
            of(ReadingListActions.addToReadingListFailure({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() => {
            this.openSnackBarUndoRemove(item);
            return ReadingListActions.removeFromReadingListSuccess({ item })
          }),
          catchError(() =>
            of(ReadingListActions.removeFromReadingListFailure({ item }))
          )
        )
      )
    )
  );

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAddToReadingList),
      concatMap(({ book }) => 
        this.http.delete(`/api/reading-list/${book.id}`).pipe(
          map(() => 
            ReadingListActions.undoAddToReadingListSuccess({ book })
          ),
          catchError(() =>
            of(ReadingListActions.undoAddToReadingListFailure({ book }))
          )
        )
      )
    )
  );


  undoRemoveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveFromReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.undoAddToReadingListSuccess({ book })),
          catchError(() =>
            of(ReadingListActions.undoAddToReadingListFailure({ book }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient, 
    private readonly store: Store, private _snackBar: MatSnackBar) {}

  openSnackBarUndoRemove(book) {
    let snackBarRef = this._snackBar.open("Removed: "+ book.title, "Undo", { duration:2000});
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(ReadingListActions.undoRemoveFromReadingList({ book }))
    });
  }

  openSnackBarUndoAdd(book) {
    let snackBarRef = this._snackBar.open("Added: "+ book.title, "Undo", { duration:2000 });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(ReadingListActions.undoAddToReadingList({ book }))
    });
  }

}
