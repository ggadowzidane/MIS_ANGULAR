import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VacationService } from '../vacation.service';
import { ApprovalService } from '../../common/approval.service';
import { VacationAdd } from '../vacation.model';

@Component({
  selector: 'app-vacation-add',
  templateUrl: './vacation-add.component.html',
  styleUrls: ['./vacation-add.component.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class VacationAddComponent implements OnInit {
  vacationAdd: VacationAdd;
  types: number[] = [1, 2, 3];
  
  /* select box phone(010, 011 ....)*/
  phoneFirst: string="010";
  phoneSecond: string;
  phoneThird: string;
  /* select box phone(010, 011 ....)*/
  phoneOption: string[] = ["010", "011", "016", "017", "018", "019", "0130"];
  
  refView: boolean = false;
  appView: boolean = false; 
  
  refName: string;
  refId : string[];
  
  appName: string;
  appId: string;
  
  employeeId: string;
  
  constructor(private vacationService: VacationService
              ,private approvalService: ApprovalService) {
    this.vacationAdd = new VacationAdd();
  }

  ngOnInit() {
    this.vacationAdd = new VacationAdd();
    this.approvalService.changeFlag.subscribe(()=> this.popupRef(false));
    this.approvalService.changeFlag.subscribe(()=> this.popupApp(false));
    
    this.approvalService.refEvent.subscribe( ()=>this.setRefName(this.approvalService.getRefName()) );
    this.approvalService.refEvent.subscribe( ()=>this.setRefId(this.approvalService.getRefId()) );
    
    this.approvalService.appEvent.subscribe(()=> this.setAppName(this.approvalService.getAppName()));
    this.approvalService.appEvent.subscribe(()=> this.setAppId(this.approvalService.getAppId()));
    
    //is.vacationService.loginEvent.subscribe(() => this.setEmployeeId(this.vacationService.getEmployeeId()));
    this.setEmployeeId(this.vacationService.getEmployeeId());
  }
  
  add(){
    console.log(this.vacationAdd);
    if(!confirm("휴가 요청 하시겠습니까?")){
      return false;
    }
    const callback = res =>{
      alert('휴가 요청하였습니다');
      this.vacationService.vacationListRefresh();
      this.addView();
    }
    this.vacationAdd.ApprovalEmployeeId = this.employeeId;
    this.vacationAdd.ApprovalRequestEmployeeId = this.employeeId;
    this.vacationAdd.ApprovalType = "1"; // 1:휴가 2:자재
    /* 여기에 model 추가 안된부분 ApprovalType, ApprovalVacationType 세가지 보고 저장하기*/
    console.log(this.vacationAdd);
    this.vacationService.add(this.vacationAdd, callback);
  }
  
  addView(){
    this.vacationService.setFlag(false);
  }
  
  popupRef(flag: boolean){
    this.refView = flag;
  }
  
  popupApp(flag: boolean){
    this.appView = flag;
  }
  
  setRefName(refName: string){
    refName = refName.substr(0,refName.length-1);
    this.refName = refName;
  }
    
  setRefId(refId: string[]){
    this.vacationAdd.ApprovalReferenceEmployeeId = refId;
    this.refId = refId;
  }
  
  setAppName(appName: string){
    this.appName = appName;
  }
  setAppId(appId: string){
    this.vacationAdd.ApprovalEmployeeId;
    this.appId = appId;
  }
  
  phoneChange(){
    this.vacationAdd.ApprovalEmployeePhone = this.phoneFirst+"-"+this.phoneSecond+"-"+this.phoneThird;
  }
    
  setEmployeeId(id : string){
    this.employeeId = id;
  }

}
