import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  employeeLayout(){
    this.router.navigateByUrl('mainLayout');
  }
  
  departmentLayout(){
    this.router.navigateByUrl('departmentLayout');
  }
  
  vacationLayout(){
    this.router.navigateByUrl('vacationLayout');
  }
}
