import { Component } from '@angular/core';
import { JUL } from '@angular/material/core';
import { connected } from 'process';
import { StockService } from './core/stock.service';
import { ShareDto } from './models/shareDto';
import { ShareTickDto } from './models/shareTickDto';
import { UserDto } from './models/userDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular10AppRouting';
  connected: boolean = false;
  buttonName: string = "Connect";
  connectedClients: number;
  username: string = "Hansi";
  cashAmount: number;
  shares: ShareDto[] = [];
  shareValue: number = 500;
  shareName: string;
  logs: string[]= [];

  user: UserDto;
  shareTicks: ShareTickDto[] = [];

  constructor(private stockService: StockService) 
  {
    console.log('*** AppComponent::constructor');
  }

  ngOnInit(): void{
    console.log(this.connected);
    this.stockService.ngOnInit();
    
    this.stockService.getShares().subscribe(x => {
      this.shares = x;
      console.log(x);
    });

    this.stockService.onTransactionReceived().subscribe(x => {
      let d = new Date();
      let clockstring = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:`
      this.logs.push(`${clockstring} ${x.shareName} stock: ${x.unitsInStockNow}`);
      this.logs.push(`${clockstring} ${x.username} ${x.isUserBuy?'bought':'sold'} ${x.amount}x${x.shareName} a ${x.price}`)
    })

    /* this.stockService.onNewStocks().subscribe(x => {
      this.shareTicks = x;
      //console.log(x);
    }) */
  }

  connect(): void{
    if(!this.connected){
      this.connected = true;
      this.buttonName = "Disconnect";
      //connect with hub
      this.stockService.getUser(this.username).subscribe(x => {
        console.log(`getUser executed: ${x.name}`);
        this.cashAmount = x.cash;
      })
      this.connectedClients = this.stockService.connect();
      console.log('###connected###');
    }else{
      this.connected = false;
      this.buttonName = "Connect";
      //disconnect with hub
      this.connectedClients = this.stockService.disconnect();
      console.log('###disconnected###');
    }
  }

  onBuy(): void{
    console.log('###buy###');
    this.stockService.sendTransaction(true, this.username, this.shareName, this.shareValue);
  }

  onSell(): void{
    console.log('###sell###');
    this.stockService.sendTransaction(false, this.username, this.shareName, this.shareValue);
  }
}
