import { Injectable } from '@angular/core';

const TIME_SETTINGS = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public calculateIsExpired(date?: string) {
    const newDate = new Date();
    return newDate > new Date(date ?? '');
  }

  public getFormattedDate(date: string) {
    return new Date(date).toLocaleString('en-US', TIME_SETTINGS as any);
  }
}
