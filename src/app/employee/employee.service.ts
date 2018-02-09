import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { Employee } from './employee.model';
import 'rxjs/add/operator/map'

@Injectable()
export class EmployeeService {
  
  flag: boolean;
  employeeList : Employee[] = [];
  changeFlag: EventEmitter<any> = new EventEmitter<any>();
  listEvent:  EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private misHttp: Http) { }
  
  list(callback) {
    return this.misHttp.get('http://localhost:3000/mis/1.0/employees').map(res => res.json()).subscribe(callback);
  }
  
  employee(employeeId: string, callback){
    return this.misHttp.get(`http://localhost:3000/mis/1.0/employees/${employeeId}`).map(res => res.json()).subscribe(callback);
  }
  
  employeeAdd(data: any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,  method: "POST"});
    let body = JSON.stringify(data); 
    return this.misHttp.post('http://localhost:3000/mis/1.0/employees', body,options).map(res => res.json()).subscribe(callback);
  }
  employeeEdit(id: string, data: any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,  method: "PUT"});
    let body = JSON.stringify(data);
    console.log(body);
    return this.misHttp.put(`http://localhost:3000/mis/1.0/employees/${id}`, body,options).map(res => res.json()).subscribe(callback);
    
  }
  
  employeeDelete(employeeId: string, callback){
    return this.misHttp.delete(`http://localhost:3000/mis/1.0/employees/${employeeId}`).map(res => res.json()).subscribe(callback);
  }
  
  emailCheck(email:string, callback){
    return this.misHttp.get(`http://localhost:3000/mis/1.0/employees/emailCheck/${email}`).map(res => res.json()).subscribe(callback);
  }
  
  passwordChange(id: string, callback){
    return this.misHttp.get(`http://localhost:3000/mis/1.0/employees/${id}/pwdReset`).map(res=>res.json()).subscribe(callback);
  }
  
  setFlag(flag: boolean){
    this.flag = flag;
    this.changeFlag.emit({});
  }
  
  getFlag(){
    return this.flag;
  }
  
  employeeListRefresh(){
    this.listEvent.emit({});
  }
}
