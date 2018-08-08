import { Component , ViewChild,  OnInit, OnDestroy} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	program = ""; 
	program_json = {
		"0": "Unbestimmt",
		"1": "Bestimme Standort",
		"2": "Kalibriere Winkel",
		"3": "Bestimme Zielort",
		"4": "Geradeaus Fahren",
		"5": "Ausweichen",
		"6":"Drehe Richtung Ziel",
		"7": "Fahre Kreis",
		"8": "Suche Linie",
		"9": "Fahre auf Linie",
		"10": "Kalibibriere Richtung",

	}
	start = false ; 
	autotag = false; 
	lager_fahren = false;
	interval = null; 
	stop_driving = false; 
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
					this.stop_driving=res["stop_driving"]; 
				}
				catch(e)
				{
					console.error("Falsche Start/Stop Info Daten erhalten:" + e);
				}
			}
			else {
				console.log("Keine Start/Stop Info Daten erhalten!");
			}
		});
		this.interval = setInterval(() => {this.receiveProgramInfo();} ,2000); 

	}
	ngOnDestroy(){
		if(this.interval){
			clearInterval(this.interval);
		}
	}

	httpSend(main_mes: any, detail_mes:any){
		let main_message = main_mes;
		let message: any;
		let warehouse_message = null;  
		let detail_message = detail_mes; 
		if(!detail_mes) detail_message = null;  
		//if(main_message == "autotag" && !this.autotag)
		//	return; 
	    if(main_message=="start" && !this.start)
	      main_message = "stop";
	  	if(main_message != "lager"){
		  	if(this.lager_fahren && this.lager.part.id != null ){
		  		warehouse_message = this.lager.part.id;
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
	  		
	    this.service.sendData([main_message, detail_message, warehouse_message]).subscribe();
	    console.log([main_message, detail_message, warehouse_message]);
  }

  receiveProgramInfo(){
  	if(this.start){
	  	this.service.sendData(["program_info", null ,null]).subscribe(res => {
	        try{
	          if(res == null){
	            console.log("Keine Programmdaten erhalten");
	          }
	          else{
	          	this.program = this.program_json[res["program"]];
	          }
	      	} 
	      	catch(e)
	      	{
	      		this.program = "Fehler, Programm nicht gefunden!";
	      		console.log("Fehler beim Empfang der Programmdaten");
	      	}         
	      });
	}
  }

}
