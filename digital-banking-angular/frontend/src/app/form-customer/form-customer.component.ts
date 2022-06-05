import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {

  newCustomerformGroup!: FormGroup;

  constructor(private customerService: CustomerService,private fb:FormBuilder
    ,private router:Router) {
  }

  ngOnInit(): void {
    this.newCustomerformGroup = this.fb.group({
      name: this.fb.control(null,[Validators.required,
        Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email])
    });
  }
  handleSaveCustomer(){
    let customer:Customer=this.newCustomerformGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next:data=>{
        alert("Customer successfully added !");
        // this.newCustomerformGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error:err => {
        console.log(err)
      }
    });
  }

}
