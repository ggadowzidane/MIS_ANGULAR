import { Component, OnInit, Input } from '@angular/core';

import { VacationService } from '../vacation.service';
import { ApprovalService } from '../../common/approval.service';
import { VacationAdd, Approval } from '../vacation.model';

@Component({
  selector: 'app-vacation-edit',
  templateUrl: './vacation-edit.component.html',
  styleUrls: ['./vacation-edit.component.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class VacationEditComponent implements OnInit {

  approval: Approval = new Approval();
  vacationEdit: VacationAdd;
  types: number[] = [1, 2, 3];
  
  /* object edit data*/
  start_date: string ="";
  end_date: string ="";
  employee_phone: string ="";
  reference_employee_id: string ="";
  request_description: string ="";
  approval_employee_id: string ="";
  /* object edit data*/
  
  /* select box phone(010, 011 ....)*/
  phoneFirst: string="010";
  phoneSecond: string;
  phoneThird: string;
  /* select box phone(010, 011 ....)*/
  phoneOption: string[] = ["010", "011", "016", "017", "018", "019", "0130"];
  /* select box phone(010, 011 ....)*/
  
  finalPhone: string ="";
  
  refName: string;
  refId : string[];
  
  appName: string;
  appId: string;
  
  refView: boolean = false;
  appView: boolean = false;
  
  @Input() vacationCode: number = 0;
  anotherCode: number = 0;
  
  constructor(private vacationService: VacationService
              ,private approvalService: ApprovalService) {
    this.vacationEdit = new VacationAdd();
  }

  ngOnInit() {
    this.approvalService.changeFlag.subscribe(()=> this.popupRef(false));
    this.approvalService.changeFlag.subscribe(()=> this.popupApp(false));
    this.approvalService.refEvent.subscribe( ()=>this.setRefName(this.approvalService.getRefName()) );
    this.approvalService.refEvent.subscribe( ()=>this.setRefId(this.approvalService.getRefId()) );
    
    this.approvalService.appEvent.subscribe(()=> this.setAppName(this.approvalService.getAppName()));
    this.approvalService.appEvent.subscribe(()=> this.setAppId(this.approvalService.getAppId()));
    
    this.get();
  }
  
  get(){
    const callback = res =>{
      this.approval = res; 
      this.start_date = this.approval.approval_data["ApprovalStartDate"];
      this.end_date= this.approval.approval_data["ApprovalEndDate"];
      let phone = this.approval.approval_data["ApprovalEmployeePhone"];
      let phones = phone.split("-");
      this.phoneSecond = phones[1];
      this.phoneThird = phones[2];
      this.finalPhone = phone;
      this.request_description = this.approval.request_description;
    }
    this.vacationService.get(this.vacationCode, callback);
  }
  
  edit(){
    if(!confirm("수정 하시겠습니까?")) return false;
    let obj = {
      "start_date": this.start_date
      ,"end_date": this.end_date
      ,"employee_phone": this.finalPhone
      ,"reference_employee_id" : this.refId
      ,"request_description": this.request_description
      ,"approval_employee_id": this.appId
    };
    console.log(obj);
    
    const callback = res =>{
      alert('수정하였습니다');
      this.editView();
    }
    this.vacationService.edit(this.vacationCode ,obj ,callback);
  }
  
  delete(){
    if(!confirm('삭제 하시겠습니까?')){
      return false;
    }
    
    const callback = res =>{
      alert('삭제하였습니다');
      this.vacationService.vacationListRefresh();
      this.editView();
    }
    //this.vacationService.delete(this.vacationCode, callback);
  }
  
  editView(){
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
    //this.vacationAdd.ApprovalReferenceEmployeeCode = refId;
    this.refId = refId;
  }
  
  setAppName(appName: string){
    this.appName = appName;
  }
  setAppId(appId: string){
    //this.vacationAdd.ApprovalEmployeeCode;
    this.appId = appId;
  }
  phoneChange(){
    this.finalPhone = this.phoneFirst+"-"+this.phoneSecond+"-"+this.phoneThird;
  }
}
