import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../login.service';
import { AppLoginService } from '../../app-login.service';
import { VacationService } from '../../vacation/vacation.service';


@Component({
  selector: 'app-login-controller',
  templateUrl: './login-controller.component.html',
  styleUrls: ['./login-controller.component.css']
})
export class LoginControllerComponent implements OnInit {
  LoginId : string = 'ggadow12';
  LoginPassword : string = '1111';
  loginResult : boolean = false;
  
  constructor(private loginService: LoginService,
              private appLoginService : AppLoginService,
              private router: Router,
              private vacationService: VacationService) { }

  ngOnInit() {
  }
  
  login(){
    const login = {"LoginId": this.LoginId, "LoginPassword": this.LoginPassword};
    const callback = res =>{
      const employee = res;
      if(this.LoginId === res.id){
        console.log(employee);
        this.vacationService.setEmployeeId(employee.id);
        this.appLoginService.setLoginFlag(true);
        this.router.navigateByUrl('mainLayout');
      }
    }
    this.loginService.login(login, callback);
  }
  
  reset(){
    this.LoginId = this.LoginPassword = '';
  }
}
