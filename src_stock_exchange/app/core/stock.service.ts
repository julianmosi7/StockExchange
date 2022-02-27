import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { connect } from 'http2';
import { UserDto } from '../models/userDto';
import { ShareDto } from '../models/shareDto';
import { ShareTickDto } from '../models/shareTickDto';
import { TransactionDto } from '../models/transactionDto';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  hubConnection: HubConnection;
  connectedClients: number;

  url = "http://localhost:5000/api/Stock"

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/stockHub')
    .build();

    this.onNewStocks();
    this.onConnectedClients();
    this.onTransactionReceived();
    //this.onTransactionReceived(x => console.log(x));
  }

  public connect(): number{
    this.hubConnection
    .start()
    .then(() => console.log('+++Connection started+++'))
    .catch(err => console.log('***Error while establishing the connection!'));
    return this.connectedClients;
  }

  public disconnect(): number{
    this.hubConnection
    .stop()
    .then(() => console.log('+++Connection terminated+++'))
    .catch(err => console.log('***Error while terminating the connection!'));
    return this.connectedClients;
  }
    
  /* onTransactionReceived(fct: (x: TransactionDto) => void): void{
    this.hubConnection.on('transactionReceived', fct);
  } */

  onTransactionReceived(): Observable<TransactionDto>{
    const subject = new Subject<TransactionDto>();
    this.hubConnection.on('transactionReceived', x => {
      subject.next(x);
    });
    return subject.asObservable();
  }

  onNewStocks(): Observable<ShareTickDto[]> {
    console.log("onNewStocks");
    const subject = new Subject<ShareTickDto[]>();
    this.hubConnection.on('newStocks', x => {
      subject.next(x);
    });
    return subject.asObservable();
  }

  onConnectedClients(): void{
    console.log("onConnectedClients");
    this.hubConnection.on('connect', (clients: number) => 
        {
          console.log(`connected clients: ${clients}`)
          this.connectedClients = clients;
        });
  }

  public get isConnected(): boolean{
    return this.hubConnection.state === HubConnectionState.Connected;
  }

  getUser(name: string): Observable<UserDto>{
      return this.http.get<UserDto>(`${this.url}/GetUser/${name}`);
  }

  getShares(): Observable<ShareDto[]>{
    return this.http.get<ShareDto[]>(`${this.url}/GetShares`);
  }

  sendTransaction(isUserBuy: boolean, username: string, shareName: string, amount: number): void{    
    if(!this.isConnected){
      console.log('*** Not connected! ***');
      return;
    }else if(isUserBuy){
      console.log(`username: ${username}, shareName: ${shareName}, amount: ${amount}, price: ${60}, unitsInStockNow: ${30}, isUserBuy: ${isUserBuy}`);
      this.hubConnection
      .invoke('BuyShare', {Username: username.toString(), ShareName: shareName.toString(), Amount: amount, Price: 0, UnitsInStockNow: 0, IsUserBuy: isUserBuy})
      .catch(err => console.log(err));
    }else if(!isUserBuy){

      this.hubConnection
      .invoke('SellShare', {Username: username.toString(), ShareName: shareName.toString(), Amount: amount, Price: 0, UnitsInStockNow: 0, IsUserBuy: isUserBuy})
      .catch(err => console.log(err));
    }
  }
}
