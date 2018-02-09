import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApprovalService } from '../approval.service';
import { Employee } from '../approval.model';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css'
              ,'../../css/table/style.css']
})
export class ApprovalComponent implements OnInit {
  
  searchName: string;
  employees : Employee[];
  appName: string ='';
  appId: string='';
  
  constructor(private approvalService : ApprovalService) { }

  ngOnInit() {
   this.approvalService.listEvent.subscribe(() =>this.searchRefresh());
  }
  
  searchList(){
    const callback = res =>{
      console.log(res);
      if(res != null) this.employees = res;
    }
    this.approvalService.employees(callback, this.searchName);
  }
  
  searchRefresh(){
    this.employees = [];
    this.searchList();
  }
  
  addRef(id,name){
    this.appId = id;
    this.appName = name;
  }
  
  appComplete(){
    this.approvalService.setAppComplete(this.appName, this.appId);
    this.approvalService.setFlag(false);
  }
  
  appView(){
    this.approvalService.setFlag(false);
  }

}
