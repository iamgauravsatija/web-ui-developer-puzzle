import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  getReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  readingList: ReadingListItem[];
  bookSearchSubscription$: Subscription;
  getBooksSubscription$: Subscription;

  searchForm = this.formBuilder.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.getBooksSubscription$ = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.bookSearchSubscription$ = this.store.select(getReadingList).subscribe(items =>{
      this.readingList = items;
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.valid && this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  checkIfFinished(bookId: String){
    const index = this.readingList.findIndex(item=> item.bookId === bookId);

    if(index > -1){
      if(this.readingList[index].finished===true){
        return true;
      } else {
        return false
      }
    }

    return false;
  }

  ngOnDestroy(): void {
    this.getBooksSubscription$.unsubscribe();
    this.bookSearchSubscription$.unsubscribe();
  }

}
