import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VacationService } from '../vacation.service';
import { Vacation, Approval} from '../vacation.model';

@Component({
  selector: 'app-vacation-view',
  templateUrl: './vacation-view.component.html',
  styleUrls: ['./vacation-view.component.css'
             /*,'../../css/form/pure-min.css'*/
             ,'../../css/form/buttons.css']
})
export class VacationViewComponent implements OnInit {

  vaction: Vacation = new Vacation();
  approval: Approval = new Approval();
  
  anotherCode: number = 0;
  @Input() vacationCode: number = 0;
  @Output() changViewEditReverse = new EventEmitter<any>();
  
  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    this.view();
  }
  
  view(){
    const callback = res =>{
      this.approval = res;
      console.log(this.approval);
    }
    this.anotherCode = this.vacationService.getCode();
    this.vacationService.setCode(this.anotherCode);
    this.vacationService.get(this.anotherCode, callback);
  }
  
  viewView(){
    this.vacationService.setFlag(false);
  }
  
  viewEditReverse(){
    this.viewView();
    this.changViewEditReverse.emit('11');
  }

}
