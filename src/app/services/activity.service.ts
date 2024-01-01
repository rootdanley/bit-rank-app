import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  userActivity!: number;
  userInactivityTimeout: number = 1 * 60 * 1000;


  constructor(

  ) { }
}
