import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css'
             ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class DepartmentViewComponent implements OnInit {
  
  department : Department = new Department();
  @Input() departmentCode: number;
  @Output() changeViewEditReverse = new EventEmitter<any>();
  
  flag: boolean;
                                                         
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    const callback = res =>{
      this.department = res;
    }
    this.departmentService.department(this.departmentCode,callback);
  }
  
  viewView(){
    this.departmentService.setFlag(false);
  }
  
  viewReverse(){
    this.viewView();
    this.changeViewEditReverse.emit('11');
  }

}
