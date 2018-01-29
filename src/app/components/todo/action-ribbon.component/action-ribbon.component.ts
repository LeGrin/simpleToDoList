import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'action-ribbon-component',
  templateUrl: 'action-ribbon.component.html',
  styleUrls: ['action-ribbon.component.scss']
})
export class ActionRibbonComponent implements OnInit, OnDestroy {
  @Input() isCompletedVisible$: Observable<boolean>;
  @Input() sortQuery$: Observable<string>;
  @Output() onInspired = new EventEmitter();
  @Output() onHideCompleted = new EventEmitter();
  @Output() onSearchChanged = new EventEmitter<string>();
  @Output() onSearchFocusChange = new EventEmitter();
  @Output() onChangeSorting = new EventEmitter<string>();
  subscriptionList: Subscription[] = [];
  hideIconClass: string = '';
  closeIconClass: string = '';
  searchQuery: string;
  nameSelected: boolean;
  dateSelected: boolean;
  nameSortTitle: string = 'Name ↓';
  dateSortTitle: string = 'Date ↓';
  localSortQuery: string;
  localIsCompletedVisible: boolean;

  ngOnInit(): void {
    this.subscriptionList.push(
      this.sortQuery$.subscribe(value => {
        this.updateSortQuery(value);
      })
    );
    this.subscriptionList.push(
      this.isCompletedVisible$.subscribe(value => {
        this.updateVisibility(value);
      })
    );
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }

  updateSortQuery = (sortQuery: string) => {
    this.localSortQuery = sortQuery;
    this.initializeSorting();
  };

  updateVisibility = (isVisible: boolean) => {
    this.localIsCompletedVisible = isVisible;
    this.toggleVisibilityIcon();
  };

  inspire = () => {
    this.onInspired.emit();
  };

  toggleVisibilityIcon() {
    this.hideIconClass = !this.localIsCompletedVisible
      ? 'fa-eye'
      : 'fa-eye-slash';
  }

  toggleClick = () => {
    this.onHideCompleted.emit();
  };

  searchChanged = () => {
    this.onSearchChanged.emit(this.searchQuery);
  };

  changeSorting = async (property: string) => {
    let newSortQuery: string = '';
    if (this.localSortQuery.indexOf(property) !== -1) {
      newSortQuery = `${property}#${-Number.parseInt(
        this.localSortQuery.split('#')[1]
      )}`;
    } else {
      newSortQuery = `${property}#1`;
    }
    await this.onChangeSorting.emit(newSortQuery);
  };

  toggleSearchFocus() {
    this.searchQuery = '';
    this.onSearchFocusChange.emit();
    this.closeIconClass =
      this.closeIconClass === '' ? 'close-search-icon_visible' : '';
  }

  initializeSorting() {
    this.nameSelected = this.localSortQuery.split('#')[0] === 'title';
    this.dateSelected = this.localSortQuery.split('#')[0] === 'createdDate';
    if (this.nameSelected) {
      this.nameSortTitle = `Name ${
        this.localSortQuery.split('#')[1] === '-1' ? '↑' : '↓'
      }`;
    }
    if (this.dateSelected) {
      this.dateSortTitle = `Date ${
        this.localSortQuery.split('#')[1] === '-1' ? '↑' : '↓'
      }`;
    }
  }
}
