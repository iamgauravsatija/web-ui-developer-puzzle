import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
      // const action1 = ReadingListActions.removeFromReadingListSuccess({
      //   item: createReadingListItem('A')
      // });

      // const result: State = reducer(state, action1);
      // const action2 = ReadingListActions.removeFromReadingListSuccess({
      //   item: createReadingListItem('B')
      // });

      // const result2: State = reducer(state, action2);
      // const action3 = ReadingListActions.removeFromReadingListSuccess({
      //   item: createReadingListItem('G')
      // });

      // const result3: State = reducer(state, action3);
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('loadBooksFailure should return to previous state with an error message', () => {
      const action = ReadingListActions.loadReadingListError({ error:'Error' });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe('Error');
    });

    it('addToReadingList should add book to list', () => {
        const list = [
          createReadingListItem('A'),
          createReadingListItem('B'),
          createReadingListItem('C'),
        ];
        ReadingListActions.loadReadingListSuccess({ list });
        const action = ReadingListActions.removeFromReadingList({
          item: createReadingListItem('A'),
        });
        const result: State = reducer(initialState, action);
        expect(result.ids.length).toEqual(0);
    });

    it('addToReadingListFailure should undo book addition to the state', () => {
      const action = ReadingListActions.addToReadingListFailure({
        book: createBook('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A']);
    });

    it('removeFromReadingListFailure should undo book removal from the state', () => {
      const action = ReadingListActions.removeFromReadingListFailure({
        item: createReadingListItem('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });

    it('markAsReadFailure should undo book removal from the state', () => {
      const action = ReadingListActions.markAsReadFailure({ error:'Error' });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe('Error');
    });

  
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
