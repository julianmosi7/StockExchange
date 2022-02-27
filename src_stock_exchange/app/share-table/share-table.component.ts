import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { threadId } from 'worker_threads';
import { StockService } from '../core/stock.service';
import { ShareDto } from '../models/shareDto';
import { ShareTickDto } from '../models/shareTickDto';

@Component({
  selector: 'share-table',
  templateUrl: './share-table.component.html',
  styleUrls: ['./share-table.component.scss']
})
export class ShareTableComponent implements OnInit {
  displayedColumns = ["name", "val"];
  dataSource: MatTableDataSource<ShareTickDto>;

  shareTicks: ShareTickDto[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.onNewStocks().subscribe(x => {
      this.shareTicks = x;
      this.dataSource = new MatTableDataSource(this.shareTicks);
    });
  }

}
