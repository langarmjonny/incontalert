import { Component, Output, EventEmitter} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {MachinesTableService } from '../../../@core/data/machines-table.service';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent  {
  position_data: any[];
  source: LocalDataSource = new LocalDataSource();
  ort: string="<Auswählen>";
  ort_obj: any ; 
  @Output() send= new EventEmitter();

  constructor(private service: MachinesTableService, private httpService: DashboardService) {
    this.checkPositions();
  }
  checkPositions(){
  	this.position_data = this.service.getData();
    this.source.load(this.position_data);
  }

  httpSend(){
    if(this.ort_obj) {
      this.send.emit(this.ort_obj.machineName); 
      }
  }
  httpSendTag(){
    this.send.emit("Tag"); 
  }

}
