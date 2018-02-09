import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';

const routes: Routes = [
  { path: 'departmentAdd', component: DepartmentAddComponent },
  /*{ path: 'employeeView/:id', component: EmployeeViewComponent},
  { path: 'employeeEdit/:id', component: EmployeeEditComponent}*/
  
];

@NgModule({
  imports: [
    CommonModule
    ,FormsModule
    ,RouterModule.forChild(routes)
  ],
  declarations: [DepartmentListComponent, DepartmentAddComponent, DepartmentViewComponent, DepartmentEditComponent],
  exports:[RouterModule]
})
export class DepartmentModule { }
