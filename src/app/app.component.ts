import { Component, OnInit } from '@angular/core';
import { AppLoginService } from './app-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeId: string;
  isLogin : boolean = false;
  nav = {'contentLogin': true, 'content':false};
  constructor(public loginService: AppLoginService){
    
  }
  ngOnInit() {
    this.loginService.isLoginChange.subscribe(() => this.loginChange());
  }
  
  loginChange(){
    this.isLogin = this.loginService.getLoginFlag();
    this.nav.content = true;
  }

}
