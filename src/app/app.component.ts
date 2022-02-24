import { Component } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {


  Temperature="Temperature";
  Humidity="Humidity"

  TemplabelStyle= {
    format: '{value}°C'
  };
  HumiditylabelStyle= {
    format: '{value}%'
  };




  constructor(private db: AngularFireDatabase) {


    //--------------FAKE DATA GENERATOR------------------
    // window.setInterval(() => {
    //   this.temp=Math.floor(Math.random() * 50)
    //   this.humidity=Math.floor(Math.random() * 100)
    //   this.limit = this.setLimit();
    //   this.updateChart(this.temp,this.humidity)
    // },
    // 2000);
    //----------------Sweet alert2-------------------
    if(this.temp>27){
      if(!this.ignored){
        Swal.fire({
          title: 'Danger, temperature is too hot! ',
          text: "You must check the server room ",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ignore!',
          didClose:() => {
            this.ignored = true;
          },

        })

      }

    }
    if(this.temp<18){
      if(!this.ignored){
        Swal.fire({
          title: 'Danger, temperature is too cold!',
          text: "You must check the server room ",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ignore!',
          didClose:() => {
            this.ignored = true;
          },

        })

      }

    }
    console.log(this.temp);
    
    if(this.humidity>60){
      if(!this.ignored){
        Swal.fire({
          title: 'Danger, humid air! ',
          text: "You must check the server room ",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ignore!',
          didClose:() => {
            this.ignored = true;
          },

        })

      }

    }
    if(this.humidity<40){
      if(!this.ignored){
        Swal.fire({
          title: 'Danger, Dry air!',
          text: "You must check the server room ",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ignore!',
          didClose:() => {
            this.ignored = true;
          },

        })

      }

    }
    console.log(this.humidity);

    // --------------------firebase-----------------

        this.limit = this.setLimit();
        const dataRef = this.db.object<string>('data');
        this.data = dataRef.valueChanges();
        this.data.subscribe((data) => {
          if (data) {
            this.temp = Number(data.split(',')[1]);
            this.humidity = Number(data.split(',')[0]);
            this.limit = this.setLimit();
            this.updateChart(this.temp,this.humidity)
          }
        });



  }
  ignored: boolean = false;
  data!: Observable<string | null>;


  title = 'iotmonitor';
  temp: number = 0;
  humidity: number = 0;
  limit!: TempLimit;
  limits: TempLimit[] = [
    {
      text: 'freezing',
      color: '#249AA7',
      limit: 10,
      num: 1,
    },
    {
      text: 'cold',
      color: '#B8E1F2',
      limit: 20,
      num: 2,
    },
    {
      text: 'ok',
      color: '#ABD25E',
      limit: 30,
      num: 3,
    },
    {
      text: 'warm',
      color: '#F8C830',
      limit: 40,
      num: 4,
    },
    {
      text: 'blazing',
      color: '#F1594A',
      limit: 50,
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



  //---------------------------CHART DATA-----------------------------------------
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature' },
    { data: [], label: 'Humidity' },
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  //--------------------------------------------------------------------



  updateChart( temp:any, humidity:any) {
    this.lineChartData[0].data?.push(temp)
    this.lineChartData[1].data?.push(humidity)
    this.lineChartLabels.push(new Date().toLocaleTimeString())

  }







}

interface TempLimit {
  text: string;
  limit: number;
  color: string;
  num: number;
}
