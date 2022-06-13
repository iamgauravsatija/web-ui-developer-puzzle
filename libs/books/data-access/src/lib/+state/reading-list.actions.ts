import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const addToReadingListFailure = createAction(
  '[Reading List API] Add to list failure',
  props<{ book: Book }>()
);

export const addToReadingListSuccess = createAction(
  '[Reading List API] Add to list Success',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFailure = createAction(
  '[Reading List API] Remove from list failure',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSuccess = createAction(
  '[Reading List API] Remove from list success',
  props<{ item: ReadingListItem }>()
);

export const undoAddToReadingList = createAction(
  '[Reading List API] Undo add to list',
  props<{ book: Book  }>()
);

export const undoAddToReadingListFailure = createAction(
  '[Reading List API] Undo add to list failure',
  props<{ book: Book }>()
);

export const undoAddToReadingListSuccess = createAction(
  '[Reading List API] Undo add to list success',
  props<{ book: Book }>()
);


export const undoRemoveFromReadingList = createAction(
  '[Reading List API] Undo remove from reading list',
  props<{ book: Book }>()
);

export const undoRemoveFromReadingListFailure = createAction(
  '[Reading List API] Undo remove from reading list failure',
  props<{ book: Book }>()
);

export const undoRemoveFromReadingListSuccess = createAction(
  '[Reading List API] Undo remove from reading list success',
  props<{ book: Book }>()
);