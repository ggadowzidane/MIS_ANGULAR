import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacationService } from '../vacation.service';
import { ApprovalService } from '../../common/approval.service';
import { Approval } from '../vacation.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css'
             ,'../../css/mainContents.css'
             ,'../../css/form/buttons.css'],
  moduleId: module.id
})
export class VacationListComponent implements OnInit {

  approvalList: Approval[] = [];
  @ViewChildren('approvalCheckbox') checkboxList: QueryList<ElementRef>;
  
  pageCounts : number[] = [10,15,20];
  pageCount : number = this.pageCounts[0];
  
  pager: any ={};
  pagedItems: any[];
  
  pagingNumber : number = 1;
  pageingNumbers: number[];
  
  approvals : number[] = [0,1,2,3];
  //approvals : number[] = [1,2,3,4];
  approval : number = this.approvals[0];
  
  department : number =0;
  departments : number[];  
  
  approvalStartDate: string = "";
  approvalEndDate: string = "";
  
  addView: boolean = false;
  editView: boolean = false;
  viewView: boolean = false;
  appYNView: boolean = false;
  
  vacationCode: number = 0;
  
  employeeId: string ="";
  
  constructor(private vacationService: VacationService
              ,private approvalService: ApprovalService) {
    this.approvalService.changeFlag.subscribe(()=>this.popupView(false,this.vacationCode));
  }
  
  ngOnInit() {
    this.pageingNumbers = [1,2,3,4,5,6,7,8,9];
    this.pageCounts = [10,15,20];
    this.approvals = [0,1,2,3];
    this.departments = [0,1,2];
    this.employeeId= this.vacationService.getEmployeeId();
    console.log(this.employeeId);
    this.approvalService.changeFlag.subscribe(()=>this.popupYNView(false,0));
    this.vacationService.changeFlag.subscribe(()=>this.popupAdd(false) );
    this.vacationService.changeFlag.subscribe(()=>this.popupView(false,0));
     this.vacationService.changeFlag.subscribe(()=>this.popupEdit(false,0));
    
    this.vacationService.listEvent.subscribe(()=> this.listRefresh());
    this.list();
    this.setPage(1);
     
  }
  //여기에 list 요청하는 코드
  list(){
    const callback = res =>{
      if(res != null) this.approvalList = res;
      console.log(res);
    }
    
    this.vacationService.list(this.approvalStartDate
                              ,this.approvalEndDate
                              ,this.pageCount
                              ,this.pagingNumber
                              ,this.employeeId
                              ,this.approval*1+1
                              ,callback);
  }
  
  delete(code: number){
    if(!confirm("삭제 하시겠습니까?")) return false;
    console.log('code ='+code);
    const callback = res =>{
      alert('삭제 하였습니다');
      this.listRefresh();
    };
    this.vacationService.delete(code, callback);
  }
  
  listRefresh(){
    this.approvalList = [];
    this.list();
  }
  
  reverseView(param: string){
    this.popupEdit(true, this.vacationCode);
  }
  
  popupAdd(flag: boolean){
    this.addView = flag;
  }  
  
  popupEdit(flag: boolean, code: number){
    this.vacationCode = code;
    this.editView = flag;
  }
  
  popupView(flag: boolean, code: number){
    this.vacationService.setCode(code);
    this.vacationCode = code;
    this.viewView = flag;
  }
  
  popupYNView(flag: boolean, code:number){
    this.approvalService.setEmployeeCode(code);
    this.appYNView = flag;
  }
  
  setPage(page: number){
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    //this.pager = this.vacationService.getPager(this.allItems.length, page);
    //(총개수, 페이지번호, 한페이지당 보여지는 개수)
    this.pager = this.vacationService.getPager(100, page, this.pageCount);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //this.pagedItems = this.pageCount;
  }
}
