import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApprovalService } from '../approval.service';
import { Employee } from '../approval.model';


@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css'
              ,'../../css/table/style.css']
})
export class ReferenceComponent implements OnInit {
  
  searchName: string;
  employees : Employee[];
  refName : string='';
  refId: string[] = [];
  
  constructor(private approvalService : ApprovalService,
              private ef: ElementRef) { }

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
  
  addRef(id, name){
    this.refName += name+", ";
    this.refId.push(id);
  }
  
  refComplete(){
    this.approvalService.setRefComplete(this.refName, this.refId);
    this.approvalService.setFlag(false);
  }
  
  refView(){
    this.approvalService.setFlag(false);
  }

}
