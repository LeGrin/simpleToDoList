import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-ribbon-component',
  templateUrl: 'action-ribbon.component.html',
  styleUrls: ['action-ribbon.component.scss']
})
export class ActionRibbonComponent implements OnInit {
  @Input() isCompletedVisible: boolean;
  @Output() onInspired = new EventEmitter();
  @Output() onHideCompleted = new EventEmitter();  
  @Output() onSearchChanged = new EventEmitter<string>();    
  @Output() onSearchFocusChange = new EventEmitter();  
  hideIconClass: string = '';
  closeIconClass: string = '';
  searchQuery: string;

  ngOnInit(): void {
    this.toggleVisibilityIcon();
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
  }

  searchChanged = () => {
    this.onSearchChanged.emit(this.searchQuery);
  }

  toggleSearchFocus() {
    this.searchQuery = '';
    this.onSearchFocusChange.emit();
    this.closeIconClass = this.closeIconClass === '' ? 'close-search-icon_visible' : '';
  }
}
