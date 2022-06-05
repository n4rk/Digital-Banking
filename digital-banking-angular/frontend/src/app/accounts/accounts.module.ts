import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenInterceptorProvider} from "../interceptors/tokenInterceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenInterceptorProvider
  ],
})
export class AccountsModule { }
