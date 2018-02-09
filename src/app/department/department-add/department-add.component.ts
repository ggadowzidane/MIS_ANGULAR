import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DepartmentAdd } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class DepartmentAddComponent implements OnInit {
  
  department : DepartmentAdd;

  constructor(private departmentService : DepartmentService) { 
    this.department = new DepartmentAdd();
  }

  ngOnInit() {
  }
  
  departmentAdd(){
      if(!confirm('부서를 추가하시겠습니까?')){
      return false;
    }
    console.log(this.department.DepartmentName);
    console.log(this.department.DepartmentRepresentation);
    console.log(this.department.DepartmentDescription);
    const callback = res =>{
      alert('부서를 추가하였습니다.');
      this.departmentListRefresh();
      this.addView();
    }
    this.departmentService.departmentAdd(this.department, callback);
  }
  
  addView(){
    this.departmentService.setFlag(false);
  }
  
  departmentListRefresh(){
    this.departmentService.departmentListRefresh();
  }

}
