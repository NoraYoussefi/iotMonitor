import { Component } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private db: AngularFireDatabase) {
    this.limit = this.setLimit();
    const dataRef = this.db.object<string>('data');
    this.data = dataRef.valueChanges();
    this.data.subscribe((data) => {
      if (data) {
        this.temp = Number(data.split(',')[1]);
        this.humidity = Number(data.split(',')[0]);
        this.limit = this.setLimit();
      }
    });
  }
  data: Observable<string | null>;

  title = 'iotmonitor';
  temp: number = 0;
  humidity: number = 0;
  limit: TempLimit;
  limits: TempLimit[] = [
    {
      text: 'freezing',
      color: '#249AA7',
      limit: 20,
      num: 1,
    },
    {
      text: 'cold',
      color: '#B8E1F2',
      limit: 40,
      num: 2,
    },
    {
      text: 'ok',
      color: '#ABD25E',
      limit: 50,
      num: 3,
    },
    {
      text: 'warm',
      color: '#F8C830',
      limit: 70,
      num: 4,
    },
    {
      text: 'blazing',
      color: '#F1594A',
      limit: 90,
      num: 5,
    },
  ];

  setLimit() {
    let limit = this.limits.filter((limit) => this.temp <= limit.limit)[0];
    if (!limit) {
      limit = this.limits[4];
    }
    return limit;
  }

  width() {
    return `${this.temp}%`;
  }
}

interface TempLimit {
  text: string;
  limit: number;
  color: string;
  num: number;
}
