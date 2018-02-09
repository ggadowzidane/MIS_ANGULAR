import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReferenceComponent } from './reference/reference.component';
import { ApprovalComponent } from './approval/approval.component';
import { ApprovalReviewComponent } from './approval-review/approval-review.component';

const routes: Routes = [
  { path: 'reference', component:ReferenceComponent},
  { path: 'approval' , component:ApprovalComponent }
];

@NgModule({
  imports: [
    CommonModule
    ,FormsModule
    ,RouterModule.forChild(routes)
  ],
  declarations: [ReferenceComponent, ApprovalComponent, ApprovalReviewComponent],
  exports:[RouterModule]
})
export class ApprovalModule { }
