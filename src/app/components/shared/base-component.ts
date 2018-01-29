import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
export class BaseComponent implements OnInit, OnDestroy {

  subscriptionList: Subscription[];

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}