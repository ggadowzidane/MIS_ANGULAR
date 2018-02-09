import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { VacationListComponent } from './vacation-list/vacation-list.component';
import { VacationAddComponent } from './vacation-add/vacation-add.component';

import { ApprovalService } from '../common/approval.service';

import { ReferenceComponent } from '../common/reference/reference.component';
import { ApprovalComponent } from '../common/approval/approval.component';
import { VacationViewComponent } from './vacation-view/vacation-view.component';
import { VacationEditComponent } from './vacation-edit/vacation-edit.component';

import { ApprovalReviewComponent } from '../common/approval-review/approval-review.component';

const routes : Routes =[
  { path: 'reference_yn', component:ApprovalReviewComponent},
  { path: 'vacationAdd', component:VacationAddComponent, children:[
      {path: 'reference', component:ReferenceComponent }
      ,{path: 'approval', component:ApprovalComponent }
      ]},
  { path: 'vacationView', component:VacationViewComponent}
  ,{ path: 'vacationEdit', component:VacationEditComponent}
];

@NgModule({
  imports: [
    CommonModule
    ,FormsModule
    ,RouterModule.forChild(routes)
  ],
  declarations: [VacationListComponent, VacationAddComponent,ReferenceComponent,ApprovalComponent, VacationViewComponent, VacationEditComponent, ApprovalReviewComponent],
  providers:[ApprovalService],
  exports:[RouterModule]
})
export class VacationModule { }
