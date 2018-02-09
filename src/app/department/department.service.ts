import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class DepartmentService {
  
  flag: boolean;
  changeFlag: EventEmitter<any> = new EventEmitter<any>();
  listEvent:  EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private http: Http) { }
  
  
  departmentList(callback){
    return this.http.get('http://localhost:3000/mis/1.0/departments').map(res => res.json()).subscribe(callback);
  }
  
  department(departmentCode: number, callback){
    return this.http.get(`http://localhost:3000/mis/1.0/departments/${departmentCode}`).map(res => res.json()).subscribe(callback);
  }
  
  departmentAdd(data: any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,  method: "POST"});
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:3000/mis/1.0/departments', body, options).map(res => res.json()).subscribe(callback);
  }
  
  departmentEdit(code: number, data: any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,  method: "PUT"});
    let body = JSON.stringify(data);
    return this.http.put(`http://localhost:3000/mis/1.0/departments/${code}`,body,options).map(res => res.json()).subscribe(callback);
  }
  
  departmentDelete(departmentCode: number, callback){
    return this.http.delete(`http://localhost:3000/mis/1.0/departments/${departmentCode}`).map(res=>res.json()).subscribe(callback);
  }
  
  setFlag(flag: boolean){
    this.flag = flag;
    this.changeFlag.emit({});
  }
  
  getFlag(){
    return this.flag;
  }
  
  departmentListRefresh(){
    this.listEvent.emit({});
  }

}
