import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {
	data = {
		x_value: null,
		y_value: null,
    phi_value: 0.0,
	};
  @Output() send= new EventEmitter(); 


  constructor() { }

  ngOnInit() {
  }

  httpSend(){
    let d = {
      x:this.data.x_value,
      y:this.data.y_value,
      phi:this.data.phi_value,
    }
    this.data.x_value = null;
    this.data.y_value = null;
    this.data.phi_value = 0.0;
  	if(d.x && d.y)
  		this.send.emit(["manual", d]);
  }
   httpBreak(){
      this.send.emit(["stopDrivingButton", null]);
  }

}
