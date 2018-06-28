import { Component , ViewChild, OnInit} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	start = false ; 
	autotag = false; 
	lager_fahren = false;
	@ViewChild('lager') lager;
	constructor(private service : DashboardService){
	}

	ngOnInit(){
		this.service.sendData(["info_start",null, null]).subscribe(res => {
			if(res != null ){
				try{
					this.start = res["start"];
					this.autotag = res["autotag"];
					this.lager_fahren = res["lager_fahren"];
				}
				catch(e)
				{
					console.log("Falsche Start/Stop Info Daten erhalten:" + e);
				}
			}
			else {
				console.log("Keine Start/Stop Info Daten erhalten!");
			}
		});

	}

	httpSend(main_mes: any, detail_mes:any){
		let main_message = main_mes;
		let message: any;
		let warehouse_message: any;  
		let detail_message = detail_mes; 
		if(!detail_mes) detail_message = null;  
		if(main_message == "autotag" && !this.autotag)
			return; 
	    if(main_message=="start" && !this.start)
	      main_message = "stop";
	  	if(main_message != "lager"){
		  	if(this.lager_fahren && this.lager.part_name != "<AUSWÄHLEN>" ){
		  		warehouse_message = this.lager.part_name;
		  	}
		}
		if (main_message == "lager")
		{
			detail_message = this.lager_fahren;
		}
		if(main_message == "autotag")
		{
			detail_message = this.autotag;
		}
	  	else 
	  		warehouse_message = null;
	  		
	    this.service.sendData([main_message, detail_message, warehouse_message]).subscribe();
	    console.log([main_message, detail_message, warehouse_message]);
  }
}
