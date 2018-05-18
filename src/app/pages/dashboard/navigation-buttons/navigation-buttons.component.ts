import { Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {MachinesTableService } from '../../../@core/data/machines-table.service';

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

  constructor(private service: MachinesTableService) {
    this.checkPositions();
  }
  checkPositions(){
  	this.position_data = this.service.getData();
  	console.log(this.position_data);
    this.source.load(this.position_data);
  }
}
