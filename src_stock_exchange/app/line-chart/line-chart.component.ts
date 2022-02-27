import { Component, OnInit } from '@angular/core';
import { StockService } from '../core/stock.service';
import { Chart, ChartDataSets } from 'chart.js';
import { Observable } from 'rxjs';
import { Label } from 'ng2-charts';
import { ShareTickDto } from '../models/shareTickDto';
import { threadId } from 'worker_threads';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  data: number[] = [];
  labels: string[] = [];
  
  shareTicks: ShareTickDto[] = [];
  firstShare: number[] = [];
  secondShare: number[] = [];
  thirdShare: number[] = [];
  fourthShare: number[] = [];
  fifthShare: number[] = [];
  
  
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.onNewStocks().subscribe(x => {
      //y-axis (data) -> value
      this.shareTicks = x;
      this.firstShare.push(x[0].val);
      this.secondShare.push(x[1].val);
      this.thirdShare.push(x[2].val);
      this.fourthShare.push(x[3].val);
      this.fifthShare.push(x[4].val);

      //x-axis (labels) -> date
      let d = new Date()
      this.labels.push(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);

      //top (label) -> shareName
      this.lineChartLabels = this.labels;
    })
  }

  lineChartData: ChartDataSets[] = [
    {data: this.firstShare, label: 'Andritz'},
    {data: this.secondShare, label: 'AT&S'},
    {data: this.thirdShare, label: 'BawagGroup'},
    {data: this.fourthShare, label: 'CAlmmo'},
    {data: this.fifthShare, label: 'DO&CO'},
  ];

  lineChartLabels: Label[] = this.labels;

  lineChartType = 'line';
  lineChartLegend = true;

}


