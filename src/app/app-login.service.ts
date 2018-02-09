import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppLoginService {
  isLogin : boolean = false;
  isLoginChange : EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }
  
  getLoginFlag(){
    return this.isLogin;
  }

  setLoginFlag(isLogin: boolean){
    this.isLogin = isLogin;
    this.isLoginChange.emit({});
  }
  
}
