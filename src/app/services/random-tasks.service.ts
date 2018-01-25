import { Injectable } from '@angular/core';

@Injectable()
export class RandomTasksService {
  private actions: string[] = ['Open', 'Close', 'Repaint', 'Redo', 'Review', 'Visit', 'Submit', 'Finish', 'Start', 'Buy']; 
  private subjectOfAction: string[] = ['task', 'book', 'door', 'code', 'elephant', 'private business', 'friends homework', 'airplane tickets'];
  private timeFrame: string[] = ['', '', 'immediately', 'today', 'in 5 minutes', 'ASAP', 'tomorrow', `on ${new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')}`];
  private getRandomValue(maxValue: number, minValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  }

  private getRandomItem(items: string[]): string {
    return items[this.getRandomValue(items.length, 0)];
  }

  public getRandTasks(): string[] {
    let listOfTasks: string[] = [];
    const numberOfTasks = this.getRandomValue(25, 1);
    for (let i = 0; i < numberOfTasks; i++) {
      let action = this.getRandomItem(this.actions);
      let subject = this.getRandomItem(this.subjectOfAction);
      let time = this.getRandomItem(this.timeFrame);
      listOfTasks.push(`${action} ${subject} ${time}`);
    }
    return listOfTasks;
  }
}
