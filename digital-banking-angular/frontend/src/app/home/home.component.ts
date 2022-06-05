import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileImg = "../assets/img/profile.jpg";
  securityservSub$ ?: Subscription;
  authenticated = false;

  constructor(private securityService:SecurityService) {
    this.authenticated = this.securityService.user !=undefined;

    this.securityservSub$ = this.securityService.userSubject.subscribe({
      next: user=>{
        this.authenticated = user!=undefined;
      },
      error: err=>{
        this.authenticated = false;
      }
    });
  }

  ngOnInit(): void {
    this.securityService.getUser()
    this.securityservSub$ = this.securityService.userSubject.subscribe({
      next: user=>{
        this.authenticated = user!=undefined;
      },
      error: err=>{
        this.authenticated = false;
      }
    });
    console.log(this.authenticated);
  }

  ngOnDestroy(): void {
    this.securityservSub$?.unsubscribe();
  }

}
