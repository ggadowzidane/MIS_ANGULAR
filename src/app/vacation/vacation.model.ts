export class VacationAdd{
  ApprovalType: string;
  ApprovalRequestEmployeeId: string;
  ApprovalReferenceEmployeeId: string[];
  ApprovalEmployeeId: string;
  ApprovalRequestDescription: string;
  ApprovalDate : Date = new Date();
  
  ApprovalVacationType: string;
  ApprovalStartDate: string;
  ApprovalEndDate: string;
  ApprovalEmployeePhone: string;
}

export class Approval{
  code: number;
  type: string;
  state: string;
  request_employee_id: string;
  request_date: Date;
  approval_employee_id: string;
  request_description: string;
  approval_description: string;
  hold_description: string;
  approval_date: Date;
  insert_date: Date;
  update_date: Date;
  hold_date: Date;
  approval_data:Object = new Object;
  
  public getApproval_data(){
    return this.approval_data;
  }
}

export class Vacation{
  code: number;
  type: string;
  start_date: Date;
  end_date: Date;
  request_description: string;
  employee_phone: number;
  request_date: Date;
  approval_yn: string;
  employee_code: string;
  approval_date: Date;
  return_description: string;
  insert_date: Date;
  update_date: Date;
}
