import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Employee } from '../employee.model';
import { EmployeeService } from'../employee.service';

@Component({
  selector: 'app-employee-controller',
  templateUrl: './employee-controller.component.html',
  styleUrls: ['./employee-controller.component.css'
              ,'../../css/main.css'
              ,'../../css/mainContents.css'
              ,'../../css/thumbnail.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css'
             ]
})
export class EmployeeControllerComponent implements OnInit {
  employeeUrl: string = './images/employee.png';
  employeeList: Employee[] =[];
  pageCounts : number[];
  pageCount : number = 15;
  employeeCount : number; 
  employeeId: string;
  employeeCheck : boolean = false;
  @ViewChildren('employeeCheckbox') checkboxList: QueryList<ElementRef>;
  
  /* popup flag*/
  addView: boolean = false;
  editView: boolean = false;
  viewView: boolean = false;
  /* popup flag*/
  
  constructor(private employeeService : EmployeeService,
              private router: Router,
              private ar: ActivatedRoute,
              private elementRef : ElementRef,) {
  }

  ngOnInit() {
    this.list();
    this.pageCounts = [15,30,45];
    this.employeeService.changeFlag.subscribe(() => this.popupAdd(false));
    this.employeeService.changeFlag.subscribe(() => this.popupEdit(false,this.employeeId));
    this.employeeService.changeFlag.subscribe(() => this.popupView(false,this.employeeId));
    this.employeeService.listEvent.subscribe(() => this.listRefresh());
  }
  
  list(){
    const callback = res => {
      if(res != null) this.employeeList = res;
      console.log(this.employeeList);
    }
    this.employeeService.list(callback);
  }
  
  pageCountClick(){
    console.log(this.pageCount);
    this.employeeCount = this.pageCount/3;
  }
  
  popupAdd(flag : boolean){
    this.addView = flag;
  }
  
  popupEdit(flag: boolean, employeeId: string){
    this.employeeId = employeeId;
    this.editView = flag;
  }
  
  popupView(flag:boolean, employeeId: string){
    this.employeeId = employeeId;
    this.viewView = flag;
  }
  
  listRefresh(){
    this.employeeList = [];
    this.list();
  }
  
  reverseView(param: string){
    this.popupEdit(true,this.employeeId);
  }
  
  checkBox(){
    if(this.employeeCheck === false){
      this.checkboxList.map((el)=>{
        el.nativeElement.checked = true;  
      });
      this.employeeCheck = true;
    }else{
      this.checkboxList.map((el)=>{
        el.nativeElement.checked = false;  
      });
      this.employeeCheck = false;
    }
  }
  
  deleteEmployee(){
    if(!confirm('삭제 하시겠습니까?')){
      return ;
    }
    this.checkboxList.map((el) =>{
      if(el.nativeElement.checked === true){
        const callback = res =>{
          console.log(res);
        }
        this.employeeService.employeeDelete(el.nativeElement.id, callback);
      }
      //this.listRefresh();
      this.employeeService.employeeListRefresh();
    });
    
  }

}
