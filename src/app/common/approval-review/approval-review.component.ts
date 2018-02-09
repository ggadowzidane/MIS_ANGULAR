import { Component, OnInit, Input } from '@angular/core';
import { ApprovalService } from '../../common/approval.service';
import { VacationService } from '../../vacation/vacation.service';
import { Vacation } from '../../vacation/vacation.model';

@Component({
  selector: 'app-approval-review',
  templateUrl: './approval-review.component.html',
  styleUrls: ['./approval-review.component.css'
             ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css'
              ,'../../css/table/style.css']
})
export class ApprovalReviewComponent implements OnInit {

  //setting
  approval_yn = [
    {"name":"승인", "value":"2"}
    ,{"name":"미승인", "value":"3"}
  ];
  
  approval_description: string ="";
  yns:string = "";
  
  vacation: Vacation = new Vacation();
  
  appynView:boolean = false;
  
  @Input() vacationCode: number = 0;
  
  constructor(private approvalService : ApprovalService
              ,private vacationService: VacationService) { 
  }

  ngOnInit() {
    
  }
  popupAppyn(flag: boolean){
    this.approvalService.setFlag(false);
  }
  
  approvalYN(){
    /*this.vacation.approval_yn = this.yns;
    this.vacation.return_description = this.approval_description;*/
    
    if(!confirm("승인 하시겠습니까?")){
      return false;
    }
    
    console.log(this.yns);
    let obj ={
      "approval_state": this.yns
      ,"approval_description": this.approval_description
    }
    
    console.log(obj);
    const callback = res =>{
      alert('완료');
      this.popupAppyn(false);
      this.vacationService.vacationListRefresh();
    }
    
    this.approvalService.approvalYN(this.vacationCode, obj, callback);
    
  }
  
}
