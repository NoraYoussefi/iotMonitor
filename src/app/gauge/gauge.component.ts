import { Component, Input, OnInit } from '@angular/core';
import { Sector } from 'ng2-gauge/lib/shared/ng2-gauge.interface';


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  public gaugeBorder!: Object;
  public majorTicks!: Object;
  public minorTicks!: Object;
  public lineStyle!: Object;
  public gaugeMargin!: Object;

  @Input() title!:string;
  @Input() valuee!:any;
  @Input() labelStylee!:any;

  input:number=10;

  max = 80;

  sectors: any[]= [
  {
    from: 0,
    to: 10,
    color: 'blue'
  },
  {
    from: 11,
    to: 20,
    color: 'cyan'
  },
  {
    from: 21,
    to: 40,
    color: 'green'
  },
  {
    from: 41,
    to: 50,
    color: 'orange'
  },
  {
    from: 51,
    to: 70,
    color: 'red'
  }
];



  constructor() { }

  ngOnInit(): void {

  }

}
