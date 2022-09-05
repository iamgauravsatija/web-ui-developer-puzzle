import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, markAsRead, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {

  constructor(private readonly store: Store) {}
  readingList$ = this.store.select(getReadingList);

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsRead(item: ReadingListItem){
    // this.store.dispatch(markAsRead({ item, finished:true, finishedDate:new Date().toISOString()  }));
    this.store.dispatch(markAsRead({ item }));
  }
}
