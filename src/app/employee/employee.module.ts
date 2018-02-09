import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeControllerComponent } from './employee-controller/employee-controller.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  { path: 'employeeAdd', component: EmployeeAddComponent },
  { path: 'employeeView/:id', component: EmployeeViewComponent},
  { path: 'employeeEdit/:id', component: EmployeeEditComponent}
  
];

@NgModule({
  imports: [
    CommonModule
    ,FormsModule
    ,RouterModule.forChild(routes)
  ],
  declarations: [EmployeeControllerComponent, EmployeeAddComponent, EmployeeViewComponent, EmployeeEditComponent],
  exports:[RouterModule]
})
export class EmployeeModule { }
