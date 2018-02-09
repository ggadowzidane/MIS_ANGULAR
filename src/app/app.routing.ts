import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

/* 로그인 관련 */
import { LoginControllerComponent } from './login/login-controller/login-controller.component';

/* 사원 관련 */
import { EmployeeControllerComponent } from './employee/employee-controller/employee-controller.component'
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';

/* 부서관련 */
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentAddComponent } from './department/department-add/department-add.component';

/* 휴가 관련 */
import { VacationListComponent } from './vacation/vacation-list/vacation-list.component';
import { VacationAddComponent } from './vacation/vacation-add/vacation-add.component';

/* 공통 관련 */
import { ReferenceComponent } from './common/reference/reference.component';

const routes: Routes = [
    { path: '', component: LoginControllerComponent},
    { path: 'mainLayout', component: EmployeeControllerComponent, children: [
      { path: 'employeeAdd', component: EmployeeAddComponent },
      { path: 'employeeView/:id', component: EmployeeViewComponent },
      { path: 'employeeEdit/:id', component: EmployeeEditComponent}
    ]},
    { path: 'departmentLayout', component:DepartmentListComponent, children:[
      { path: 'departmentAdd', component:DepartmentAddComponent}
    ]},
    { path: 'vacationLayout', component:VacationListComponent, children:[
    { path:'vacationAdd', component:VacationAddComponent}
    ]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule
    ,RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
