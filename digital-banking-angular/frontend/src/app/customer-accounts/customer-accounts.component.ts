import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {AccountDTO, AccountHistory} from "../model/account.model";
import {AccountService} from "../services/account.service";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!:number;
  customer!:Customer;
  accounts!: Observable<Array<AccountDTO>>;
  errorMessage! :string;


  constructor(private customerService: CustomerService,private accountService:AccountService,private route:ActivatedRoute,private router:Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    if(this.customer==null){
      this.router.navigateByUrl("/customers")
    }
    console.log(this.accountService.getAccountByCustomerID(this.route.snapshot.params["id"]).
    subscribe(accounts=>{
      console.log(accounts);
    }));
    this.customerId=this.route.snapshot.params["id"];
    this.accounts=this.accountService.getAccountByCustomerID(this.customerId).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteCustomer(c:Customer){
    if(!confirm("You sure about deleting this customer ?")) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next:(resp)=>{
        this.router.navigateByUrl('/customers');
      },
      error:err => {
        console.log(err)
      }
    });
  }

  handleAccountsOperations(account:AccountDTO){
    this.router.navigateByUrl('/accounts/'+account.id,{state:account});
  }


}
