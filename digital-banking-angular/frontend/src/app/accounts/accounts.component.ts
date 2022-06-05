import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountDTO, AccountHistory} from "../model/account.model";
import {AccountService} from "../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!:FormGroup;
  operationFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  errorMessage! :string;
  accounts!: Observable<AccountHistory>;
  accountId: number=0;
  accountInfo!: AccountDTO  ;

  constructor(private fb:FormBuilder,private accountService:AccountService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.accountId=this.route.snapshot.params["id"];

    this.accountService.getAccountInfo(String(this.accountId)).subscribe(
      data => {
        this.accountInfo = data;
      }
    );

    this.accountFormGroup=this.fb.group({
      accountId:this.fb.control(this.accountId)
    });
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)

    });
    if (this.accountId!=0)
    {
      this.handleSearchAccount();
    }

  }
  handleSearchAccount(){
    let accountID:string=this.accountFormGroup.value.accountId;
    this.accounts=this.accountService.getAccount(accountID,this.currentPage,this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }
  goToPage(page:number){
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId:string=this.accountFormGroup.value.accountId;
    let amount:number=this.operationFormGroup.value.amount;
    let description:string=this.operationFormGroup.value.description;
    let operationType:string=this.operationFormGroup.value.operationType;
    let accountDestination:string=this.operationFormGroup.value.accountDestination;
    if(operationType=="DEBIT")
    {
      this.accountService.debit(accountId,amount,description).subscribe( {
          next:(data)=>{
            this.operationFormGroup.reset();
            this.handleSearchAccount();
            alert("Debit Operation succeeded !")
          },
          error:(err => {
            alert(err)
          })
        }

      );
    }
    else  if (operationType=="CREDIT"){
      this.accountService.credit(accountId,amount,description).subscribe( {
          next:(data)=>{
            this.operationFormGroup.reset();
            this.handleSearchAccount();
            alert("Credit Operation succeeded !")
          },
          error:(err => {
            alert(err)
          })
        }

      );
    }
    else if (operationType=="TRANSFER"){
      console.log(accountId+" "+accountDestination)
      this.accountService.transfer(accountId,accountDestination,amount).subscribe( {
          next:(data)=>{
            this.operationFormGroup.reset();
            this.handleSearchAccount();
            alert("Transfer Operation succeeded !")
          },
          error:(err => {
            alert(err)
          })
        }

      );
    }

  }
}
