import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountDTO, AccountHistory, AccountOperationDTO} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  public getAccount(accountId:string,page:number,size:number):Observable<AccountHistory>{
    return this.http.get<AccountHistory>(environment.backendHost+"/digital-banking/accounts/"+accountId+"/pageOperations?" +
      "page="+page+"&size"+size);
  }

  public getAccountInfo(accountId : string): Observable<AccountDTO>{
    return this.http.get<AccountDTO>(environment.backendHost+"/digital-banking/accountInfo/"+accountId);
  }

  public getAccountByCustomerID(customerID: number):Observable<Array<AccountDTO>>{
    return this.http.get<Array<AccountDTO>>(environment.backendHost+"/digital-banking/account/"+customerID);
  }
  public debit(accountId:string,amount:number,description:string){
    let data={accountId,amount ,description}
    return this.http.post(environment.backendHost+"/digital-banking/accounts/debit",data);
  }
  public credit(accountId:string,amount:number,description:string){
    let data={accountId,amount,description}
    return this.http.post(environment.backendHost+"/digital-banking/accounts/credit",data);
  }
  public transfer(accountSourceId:string,accountDestinationId:string,amount:number){
    let data={accountSourceId,accountDestinationId,amount}
    return this.http.post(environment.backendHost+"/digital-banking/accounts/transfer",data);
  }
}
