import { Component, OnInit } from '@angular/core';
import {DashboardService } from '../../../@core/data/dashboard.service';


@Component({
  selector: 'manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {
	data = {
		x_value: null,
		y_value: null,
	};


  constructor(private service: DashboardService) { }

  ngOnInit() {
  }

  httpSend(){
  	if(this.data.x_value &&this.data.y_value)
  		console.log(this.service.sendData(this.data));
  	this.data.x_value = null; 
  	this.data.y_value = null; 
  }

}
