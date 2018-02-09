import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Department, DepartmentAdd } from '../department.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'
              ,'../../css/employeAddPopup.css'
              ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class DepartmentEditComponent implements OnInit {
  
  department : Department = new Department();
  departmentEdit : DepartmentAdd = new DepartmentAdd();
  @Input() departmentCode : number ;
  
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    const callback = res =>{
      this.department = res;
      this.editInit();
    }
    this.departmentService.department(this.departmentCode, callback); 
  }
  
  editInit(){
    this.departmentEdit.DepartmentName = this.department.name;
    this.departmentEdit.DepartmentRepresentation = this.department.representation;
    this.departmentEdit.DepartmentDescription = this.department.description;
  }
  
  departmentEditCall(){
    const callback = res =>{
      alert('사원정보가 수정되었습니다.');
      this.editView();
      this.departmentService.departmentListRefresh();
    }
    this.departmentService.departmentEdit(this.departmentCode, this.departmentEdit, callback);
  }
  
  editView(){
    this.departmentService.setFlag(false);
  }

}
