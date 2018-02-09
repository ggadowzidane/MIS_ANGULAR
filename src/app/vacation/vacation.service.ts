import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Injectable()
export class VacationService {

  flag : boolean;  
  employeeId : string;
  vacationCode: number =0;
  
  changeFlag: EventEmitter<any> = new EventEmitter<any>();
  listEvent:  EventEmitter<any> = new EventEmitter<any>();
  loginEvent: EventEmitter<any> = new EventEmitter<any>();
  codeEvent:  EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private http: Http) { }
  
  list(approvalStartDate: string
        ,approvalEndDate: string
        ,pageCount: number
        ,pagingNumber: number
        ,employeeId: string
        ,approvalState: number
        ,callback){
    return this.http.get(`http://localhost:3000/mis/1.0/vacations/approvals?employeeId=${employeeId}&approvalState=${approvalState}&pageCount=${pageCount}&pagingNumber=${pagingNumber}&approvalStartDate=${approvalStartDate}&approvalEndDate=${approvalEndDate}`).map(res =>res.json()).subscribe(callback);
  }
  
  get(code: number, callback){
    return this.http.get(`http://localhost:3000/mis/1.0/vacations/approvals/${code}`).map(res => res.json()).subscribe(callback);
  }
  
  //rest로 콜하는 url만 변경
  add(data: any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,method:"POST"});
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:3000/mis/1.0/vacations/approvals', body, options).map(res => res.json()).subscribe(callback);
  }
  
  //rest로 콜하는 url만 변경
  edit(code: number ,data:any, callback){
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = new RequestOptions({headers: headers,method:"PUT"});
    let body = JSON.stringify(data);
    return this.http.put(`http://localhost:3000/mis/1.0/approvals/${code}`, body, options).map(res => res.json()).subscribe(callback);
  }
  
  delete(code: number, callback){
    return this.http.delete(`http://localhost:3000/mis/1.0/vacations/approvals/${code}`).map(res =>res.json()).subscribe(callback)
  }
  
  setFlag(flag: boolean){
    this.flag = flag;
    this.changeFlag.emit({});
  }
  
  getFlag(){
    return this.flag;
  }
  
  setEmployeeId(id : string){
    this.employeeId = id;
    this.loginEvent.emit({});
  }
  
  getEmployeeId(){
    return this.employeeId;
  }
  
  setCode(code: number){
    this.vacationCode = code;
  }
  
  getCode(){
    return this.vacationCode;
  }
  
  vacationListRefresh(){
    this.listEvent.emit({});
  }
  
  getPager(totalItems: number, currentPage: number=1, pageSize: number){
    let totalPages = Math.ceil(totalItems/ pageSize);
    
    let startPage: number, endPage: number;
    if(totalPages <= 10){
      startPage = 1;
      endPage = totalPages;
    }else{
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
    }
    
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = _.range(startPage, endPage + 1);

    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

}
