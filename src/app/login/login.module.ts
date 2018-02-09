import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginControllerComponent } from './login-controller/login-controller.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
    ,FormsModule
  ],
  declarations: [LoginControllerComponent],
  exports : [LoginControllerComponent]
})
export class LoginModule { }
