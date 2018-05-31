import { Component , ViewChild} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import {GrabSettingsComponent} from '../grab-settings/grab-settings.component';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	start = false ; 
	autotag = false; 
	lager_fahren = false;
	@ViewChild('lager') lager: GrabSettingComponent;
	constructor(private service : DashboardService){
	}

	httpSend(mes: any){
		let message = mes;
		let lager;
		if(message == "autotag" && !this.autotag)
			return; 
	    if(message=="start" && !this.start)
	      message = "stop"; 
	  	if(this.lager_fahren && this.lager.part_name != "<AUSWÄHLEN>"){
	  		message = [message ,this.lager.part_name];
	  	}
	  	else 
	  		message = [message ,null];
	  		
	    this.service.sendData(message).subscribe();
	    console.log(message);
  }
}
