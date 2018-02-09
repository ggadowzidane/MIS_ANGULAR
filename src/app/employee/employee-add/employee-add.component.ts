import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Employee, EmployeeAdd } from '../employee.model';
import { EmployeeService } from'../employee.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'
             ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class EmployeeAddComponent implements OnInit {
  private jquery : JQuery;
  employee: EmployeeAdd;
  
  
  /* select box option value*/
  year:string;
  month:string ="1";
  day:string ="1";
  genderOption: string[] = ["남", "여"];
  yearOption: string[] = [];
  monthOption: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  dayOption: string[] = [];
  days: string[] = ["31","29","31","30","31","30","31","31","30","31","30","31"];
  /* select box option value*/
  
  /* select box phone(010, 011 ....)*/
  phoneFirst: string="010";
  phoneSecond: string;
  phoneThird: string;
  phoneOption: string[] = ["010", "011", "016", "017", "018", "019", "0130"];
  /* select box phone(010, 011 ....)*/
  
  /* select box department */
  department: string;
  departments: string[] = ["개발1팀", "개발2팀"];
  /* select box department */
  
  /* select box position */
  positions: string[] = ["인턴", "사원", "주임", "대리", "과장", "차장", "부장"];
  /* select box position */
  
  /* address first, second*/
  addressFirst: string;
  addressSecond: string;
  /* address first, second*/
  
  /* email Check*/
  emailFlag = {
    'emailCheck':true, 'emailChecked':false, "emailError":false 
  }
  emailText: string;
  /* email Check*/
  
  /*popup AddView*/
  /*flag: boolean;*/
  /*popup AddView*/
  
  
  constructor(private employeeService: EmployeeService
              ,private router: Router) { }

  ngOnInit() {
    this.employee = new EmployeeAdd();
    this.yearOptionInit();
  }
  
  /* 생년월일 함수*/
  yearOptionInit(){
    let year: number = 1900;
    this.year = year.toString();
    let curYear: number = (new Date().getFullYear())*1;
    
    for(year; year<=curYear; year++){
      this.yearOption.push(year+"");
    }
    
    for(let i:number =0; i<31; i++){
      this.dayOption.push((i+1)+"");
    }
  }
  monthOptionInit(){
   this.month = null; 
  }
  dayOptionInit(month: string){
    let year: number = parseInt(this.year);
    if((year%4 == 0 && year%100 !=0) || year%400 ==0){
      if(month ="2"){
        this.days[1]="28";
      }
    }
    this.dayOption = [];
    this.day = null;
    let days: number = parseInt(this.days[parseInt(month)-1]);
    for(let i=0; i<days; i++){
      this.dayOption.push((i+1)+"");
    }
    this.days[1]="29";
  }
  
  birthInit(){
    this.employee.EmployeeBirth = this.year+"-"+this.month+"-"+this.day;
  }
  /* 생년월일 함수*/
  
  /* 전화번호 함수*/
  phoneChange(){
    this.employee.EmployeePhone = this.phoneFirst+"-"+this.phoneSecond+"-"+this.phoneThird;
  }
  /* 전화번호 함수*/
  
  /* 부서 함수*/
  departmentChange(){
    this.employee.EmployeeDepartment = this.department;
  }
  /* 부서 함수*/
  
  /* 주소 함수*/
  addressinit(){
    this.employee.EmployeeAddress = this.addressFirst+", "+this.addressSecond;
  }
  /* 주소 함수*/
  
  
  emailCheck(){
    const callback = res =>{
      this.emailFlag.emailCheck = false;
      if(res.checkYn == true){
        this.emailText= "※ 사용 불가능한 이메일입니다.";
        this.emailFlag.emailError = true;
        this.emailFlag.emailChecked = false;
      }else{
        this.emailText = "※ 사용 가능한 이메일입니다.";
        console.log(this.emailText);
        this.emailFlag.emailChecked = true;
        this.emailFlag.emailError = false;
      }
    }
    this.employeeService.emailCheck(this.employee.EmployeeEmail,callback);
  }
  
  employeeAdd(){
    if(!confirm('사원을 추가하시겠습니까?')){
      return false;
    }
    this.employee.EmployeeType = 1;
    this.employee.EmployeePassword= "1111";
    this.employee.EmployeeVacation_count = 12;
    this.employee.EmployeeInsert_date="2017-01-01";
    const callback = res =>{
      alert('사원을 추가하였습니다.');
      this.employeeListRefresh();
      this.addView();
    }
    this.employeeService.employeeAdd(this.employee, callback);
  }
  
  addView(){
    this.employeeService.setFlag(false);
  }
  
  employeeListRefresh(){
    this.employeeService.employeeListRefresh();
  }

}
