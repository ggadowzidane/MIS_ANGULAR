import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApprovalService {
  
  refName : string='';
  refId: string[];
  appName: string;
  appId: string;
  flag: boolean;
  code: number = 0;
  refEvent: EventEmitter<any> = new EventEmitter<any>();
  appEvent: EventEmitter<any> = new EventEmitter<any>();
  changeFlag: EventEmitter<any> = new EventEmitter<any>();
  listEvent: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private http: Http) { }
  
  employees(callback, employeeName){
    console.log(employeeName);
    if(employeeName != null){
      return this.http.get(`http://localhost:3000/mis/1.0/employees/${employeeName}`).map(res => res.json()).subscribe(callback);
    }else{
      return this.http.get('http://localhost:3000/mis/1.0/employees').map(res => res.json()).subscribe(callback);
    }
  }
  
  approvalYN(code: number, data: any, callback){
     let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,method:"PUT"});
    let body = JSON.stringify(data);
    return this.http.put(`http://localhost:3000/mis/1.0/vacations/approvals/8/evaluate`, body, options).map(res => res.json()).subscribe(callback);
  }
  
  setRefComplete(refName: string, refId: string[]){
    this.refName = refName;
    this.refId = refId;
    this.refEvent.emit({});
  }
  
  setAppComplete(appName: string, appId: string){
    this.appName = appName;
    this.appId = appId;
    this.appEvent.emit({});
  }
  
  getRefName(){
    return this.refName;
  }
  getRefId(){
    return this.refId;
  }
  
  getAppName(){
    return this.appName;
  }
  getAppId(){
    return this.appId;
  }
  
  setFlag(flag: boolean){
    this.flag = flag;
    this.changeFlag.emit({});
  }
  
  getFlag(){
    return this.flag;
  }
  
  searchListRefresh(){
    this.listEvent.emit({});
  }
  
  setEmployeeCode(code: number){
    this.code = code;
  }
  getEmployeeCode(){
    return this.code;
  }
}
