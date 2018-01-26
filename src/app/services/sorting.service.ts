import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {
  public getSorting(query: string) {
    const sortProperty: string = query.split('#')[0];    
    const sortDirection: number = Number.parseInt(query.split('#')[1]);

    // tslint:disable-next-line:no-any
    return (a: any, b: any) => {
      return (a[sortProperty] > b[sortProperty]) ? sortDirection : -sortDirection;
    };
  }
}
