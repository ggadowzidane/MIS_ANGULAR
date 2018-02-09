import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'
             ,'../../css/mainContents.css'
             ,'../../css/form/buttons.css']
})
export class DepartmentListComponent implements OnInit {
  
  departmentCode : number ;
  departmentList: Department[] =[];
  
  pageCount : number = 15;
  pageCounts : number[];
  
  tableCheck : boolean = false;
  departmentCheck : boolean = false;
  @ViewChildren('departmentCheckbox') checkboxList : QueryList<ElementRef>;
  
  
  addView: boolean = false;
  editView: boolean = false;
  viewView: boolean = false;
  constructor(private departmentService : DepartmentService) { }

  ngOnInit() {
    this.list();
    this.pageCounts = [15,30,45];
    this.departmentService.changeFlag.subscribe(() => this.popupAdd(false));
    this.departmentService.changeFlag.subscribe(() => this.popupView(false,this.departmentCode));
    this.departmentService.changeFlag.subscribe(() => this.popupEdit(false,this.departmentCode));
    this.departmentService.listEvent.subscribe(() => this.listRefresh());
    
    
  }
  
  list(){
    const callback = res =>{
      if(res != null) this.departmentList = res;
      console.log(this.departmentList);
    }
    this.departmentService.departmentList(callback);
  }
  
  deleteDepartment(){
    if(!confirm('삭제 하시겠습니까?')) return false;
    
    this.checkboxList.map((el) =>{
      if(el.nativeElement.checked === true){
        const callback =res =>{
          console.log(res);
        }
        this.departmentService.departmentDelete(el.nativeElement.id, callback);
        this.listRefresh();
      }
    });
  }
  
  checkBox(){
    console.log('1');
    if(this.departmentCheck === false){
      this.checkboxList.map((el)=>{
        el.nativeElement.checked = true;  
      });
      this.departmentCheck = true;
      this.tableCheck = true;
    }else{
      this.checkboxList.map((el)=>{
        el.nativeElement.checked = false;  
      });
      this.departmentCheck = false;
      this.tableCheck = false;
    }
  }
  
  reverseView(param: string){
    this.popupEdit(true, this.departmentCode);
  }
  
  listRefresh(){
    this.departmentList = [];
    this.list();
  }
  
  popupAdd(flag: boolean){
    this.addView = flag;
  }
  
  popupEdit(flag: boolean, departmentCode: number){
    this.departmentCode = departmentCode;
    this.editView = flag;
  }
  
  popupView(flag:boolean, departmentCode: number ){
    this.viewView = flag;
    this.departmentCode = departmentCode;
  }

}
