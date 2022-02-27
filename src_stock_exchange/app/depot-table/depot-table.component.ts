import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../core/stock.service';
import { DepotDto } from '../models/depotDto';

@Component({
  selector: 'depot-table',
  templateUrl: './depot-table.component.html',
  styleUrls: ['./depot-table.component.scss']
})
export class DepotTableComponent implements OnInit {
  displayedColumns = ["shareName", "amount"];
  dataSource: MatTableDataSource<DepotDto>;

  depot: DepotDto[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    
  }

}
