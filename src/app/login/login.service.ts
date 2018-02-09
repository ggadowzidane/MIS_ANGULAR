import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

  constructor(private misHttp: Http) { }
  
  get(url: string) {
    return this.misHttp.get(url);
  }
  
  login(data: any, callback){
    return this.misHttp.post('http://localhost:3000/mis/1.0/login',data).map(res => res.json()).subscribe(callback);
  }

}
