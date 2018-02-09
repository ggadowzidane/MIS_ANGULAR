/* core module */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/* core module */

/* app module */
import { ApprovalModule } from './common/index';
import { VacationModule } from './vacation/index';
import { DepartmentModule } from './department/index';
import { EmployeeModule } from './employee/index';
import { MisLayoutModule } from './mis-layout/index';
import { LoginModule } from './login/index';
import { AppRoutingModule } from './app.routing';
/* app module */

import { AppComponent } from './app.component';

/* app Service*/
import { ApprovalService } from './common/approval.service';
import { VacationService } from './vacation/vacation.service';
import { DepartmentService } from './department/department.service';
import { LoginService } from './login/login.service';
import { EmployeeService } from './employee/employee.service';
import { AppLoginService } from './app-login.service';


/*import { DepartmentListComponent } from './department/department-list/department-list.component';*/
/* app Service*/

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    /* core module */
    BrowserModule
    ,FormsModule
    ,HttpModule
    
    /* app module */
    ,VacationModule
    ,DepartmentModule
    ,EmployeeModule
    ,MisLayoutModule
    ,LoginModule
    ,AppRoutingModule
  ],
  providers: [ApprovalService
             ,VacationService
             ,DepartmentService
             ,LoginService
             ,EmployeeService
             ,AppLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
