import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from'../employee.service';
import { Employee, EmployeeAdd } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'
             ,'../../css/employeAddPopup.css'
             ,'../../css/form/buttons.css'
              ,'../../css/form/pure-min.css']
})
export class EmployeeEditComponent implements OnInit {
  employee : Employee = new Employee();
  employeeEdit : EmployeeAdd = new EmployeeAdd();
  @Input() employeeId: string;
  
  /* select box option value*/
  year:string;
  month:string ="1";
  day:string;
  genderOption: string[] = ["남", "여"];
  yearOption: string[] = [];
  monthOption: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  dayOption: string[] = [];
  days: string[] = ["31","29","31","30","31","30","31","31","30","31","30","31"];
  /* select box option value*/
  
  /* select box phone(010, 011 ....)*/
  phoneFirst: string;
  phoneSecond: string;
  phoneThird: string;
  phoneOption: string[] = ["010", "011", "016", "017", "018", "019", "0130"];
  /* select box phone(010, 011 ....)*/
  
  /* select box department */
  department: string ="개발1팀";
  departments: string[] = ["개발1팀", "개발2팀"];
  /* select box department */
  
  /* select box position */
  positions: string[] = ["인턴", "사원", "주임", "대리", "과장", "차장", "부장"];
  /* select box position */
  
  /* address first, second*/
  addressFirst: string;
  addressSecond: string;
  /* address first, second*/
  
  /*popup EditView*/
  flag: boolean;
  /*popupEditView*/
  
  
  /* email Check*/
  emailFlag = {
    'emailCheck':true, 'emailChecked':false, "emailError":false 
  }
  emailText: string;
  /* email Check*/
  
  constructor(private employeeService: EmployeeService,
              private ar : ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const callback = res =>{
      this.employee = res;
      this.yearOptionInit();
      this.editInit();
    }
    this.employeeService.employee(this.employeeId ,callback);
  }
 
  editInit(){
    this.employeeEdit.EmployeeName = this.employee.name;
    this.employeeEdit.EmployeeGender = this.employee.gender;
    this.employeeEdit.EmployeeBirth = this.employee.birth;
    this.employeeEdit.EmployeePhone = this.employee.phone;
    this.employeeEdit.EmployeeEmail = this.employee.email;
    this.employeeEdit.EmployeeDepartment = this.employee.department;
    this.employeeEdit.EmployeePosition = this.employee.position;
    this.employeeEdit.EmployeeAddress = this.employee.address;
    this.employeeEdit.EmployeeZipcode = this.employee.zipcode;
    this.employeeEdit.EmployeeSalary = this.employee.salary;
    /* birth */
    let birth = this.employee.birth.split("-");
    birth[2] = birth[2].substring(0,2);
    this.year=birth[0]; this.month=birth[1].replace("0",""); this.day=birth[2];
    /* birth */
    
    /* phone */
    let phone = this.employee.phone.split("-");
    this.phoneFirst = phone[0];
    this.phoneSecond = phone[1];
    this.phoneThird = phone[2];
    /* phone */
    
    /* address */
    let address = this.employee.address.split(",");
    this.addressFirst = address[0];
    this.addressSecond = address[1];
    
    /* address */
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
    this.employeeEdit.EmployeeBirth = this.year+"-"+this.month+"-"+this.day;
  }
  /* 생년월일 함수*/
  
  /* 전화번호 함수*/
  phoneChange(){
    this.employeeEdit.EmployeePhone = this.phoneFirst+"-"+this.phoneSecond+"-"+this.phoneThird;
  }
  /* 전화번호 함수*/
  
  /* 주소 함수*/
  addressinit(){
    this.employeeEdit.EmployeeAddress = this.addressFirst+", "+this.addressSecond;
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
    this.employeeService.emailCheck(this.employeeEdit.EmployeeEmail,callback);
  }
  
  employeeEditHttp(){
    const callback = res =>{
      alert('사원정보가 수정되었습니다.');
      this.editView();
    } 
    this.employeeService.employeeEdit(this.employee.id, this.employeeEdit, callback);
  }
  
  passwordChange(){
    if(!confirm('비밀번호를 변경하시겠습니까?')){
      return false;
    }
    const callback = res =>{
      alert('비밀번호 변경이 완료되었습니다.');
    }
    this.employeeService.passwordChange(this.employee.id, callback);
  }
  
  editView(){
    this.employeeService.setFlag(false);
  }

}
