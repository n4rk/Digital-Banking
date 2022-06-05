import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage! :string;
  searchFormGroup: FormGroup | undefined;
  userIsAdmin=false;
  userSub$ ?: Subscription

  constructor(private customerService: CustomerService,private fb:FormBuilder,private router:Router,private securityService: SecurityService) {
    this.userIsAdmin = securityService.user?.roles.find(e=>e.roleName=='ADMIN')!=undefined;
    this.userSub$ = this.securityService.userSubject.subscribe({
      next: user=>{
        this.userIsAdmin = user?.roles.find(e=>e.roleName=='ADMIN')!=undefined;
      }
    })
  }

  ngOnInit(): void {
    this.userIsAdmin = this.securityService.user?.roles.find(e=>e.roleName=='ADMIN')!=undefined;
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchCustomers();
    console.log(this.customerService.getCustomers().subscribe(customers=>{
      console.log(customers);
    }));

  }
  handleSearchCustomers(){
    let kw=this.searchFormGroup?.value.keyword;

    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );


  }

  handleDeleteCustomer(c:Customer){
    if(!confirm("You sure about deleting this customer ?"))return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next:(resp)=>{
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1);
            return data
          })
        );
      },
      error:err => {
        console.log(err);
      }
    });
  }

  handleCustomerAccounts(customer:Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state:customer});
  }

  ngOnDestroy(): void {
    this.userSub$?.unsubscribe();
  }
}
