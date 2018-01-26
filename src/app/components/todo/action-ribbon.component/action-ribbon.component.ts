import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-ribbon-component',
  templateUrl: 'action-ribbon.component.html',
  styleUrls: ['action-ribbon.component.scss']
})
export class ActionRibbonComponent implements OnInit {
  @Input() isCompletedVisible: boolean;
  @Input() sortQuery:  string;
  @Output() onInspired = new EventEmitter();
  @Output() onHideCompleted = new EventEmitter();
  @Output() onSearchChanged = new EventEmitter<string>();
  @Output() onSearchFocusChange = new EventEmitter();
  @Output() onChangeSorting = new EventEmitter<string>();
  hideIconClass: string = '';
  closeIconClass: string = '';
  searchQuery: string;
  nameSelected: boolean;
  dateSelected: boolean;
  nameSortTitle: string = 'Name ↓';
  dateSortTitle: string = 'Date ↓';

  ngOnInit(): void {
    this.toggleVisibilityIcon();
    this.initializeSorting();
  }

  inspire = () => {
    this.onInspired.emit();
  };

  toggleVisibilityIcon() {
    this.hideIconClass = !this.isCompletedVisible ? 'fa-eye' : 'fa-eye-slash';
  }

  toggleClick = () => {
    this.onHideCompleted.emit();
    this.toggleVisibilityIcon();
  };

  searchChanged = () => {
    this.onSearchChanged.emit(this.searchQuery);
  };

  changeSorting = async(property: string) => {
    let newSortQuery: string = '';
    if (this.sortQuery.indexOf(property) !== -1) {
      newSortQuery = `${property}#${-Number.parseInt(
        this.sortQuery.split('#')[1]
      )}`;
    } else {
      newSortQuery = `${property}#1`;
    }
    await this.onChangeSorting.emit(newSortQuery);
    this.sortQuery = newSortQuery;
    this.initializeSorting();
  };

  toggleSearchFocus() {
    this.searchQuery = '';
    this.onSearchFocusChange.emit();
    this.closeIconClass =
      this.closeIconClass === '' ? 'close-search-icon_visible' : '';
  }

  initializeSorting() {
    this.nameSelected = this.sortQuery.split('#')[0] === 'title';
    this.dateSelected = this.sortQuery.split('#')[0] === 'createdDate';
    if (this.nameSelected) {
      this.nameSortTitle = `Name ${
        this.sortQuery.split('#')[1] === '-1' ? '↑' : '↓'
      }`;
    }
    if (this.dateSelected) {
      this.dateSortTitle = `Date ${
        this.sortQuery.split('#')[1] === '-1' ? '↑' : '↓'
      }`;
    }
  }
}
