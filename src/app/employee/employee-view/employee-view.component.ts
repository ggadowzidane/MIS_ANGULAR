import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from'../employee.service';
import { Employee } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'
             ,'../../css/employeAddPopup.css'
             ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class EmployeeViewComponent implements OnInit {
  employee : Employee = new Employee();
  @Input() employeeId: string;
  @Output() changeViewEditReverse = new EventEmitter<any>();
  
  /*popup viewView*/
  flag: boolean;
  /*popup viewView*/
  
  constructor(private employeeService: EmployeeService,
              private ar : ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const callback = res =>{
      this.employee = res;
    }
    this.employeeService.employee(this.employeeId,callback);
  }
  
  employeeDelete(){
    const callback = res =>{
      if(res === 'delete success'){
        this.viewView();
        this.employeeListRefresh();
      }
    }
    if(confirm("사원을 삭제하시겠습니까?")){
      this.employeeService.employeeDelete(this.employee.id, callback);
    }
  }
  
  viewView(){
    this.employeeService.setFlag(false);
  }
  
  employeeListRefresh(){
    this.employeeService.employeeListRefresh();
  }
  
  viewReverse(){
    this.viewView();
    this.changeViewEditReverse.emit('11');
  }

}
