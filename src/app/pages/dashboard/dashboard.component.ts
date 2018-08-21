import { Component , ViewChild,  OnInit, OnDestroy} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
		"10": "Fahre zurück",
		"11": "Wechsle Spur",
		"12": "Kalibibriere Richtung",
		"13": "Warte auf neue Daten",
		"14": "Warte auf Server",
	}
	warehouse_text = {
		0: "Hole kein Teil",
		1: "Hole schwarzes Teil",
		2: "Hole rotes Teil",
		3: "Hole silbernes Teil",
	}
	start = false ; 
	autotag = false; 
	lager_fahren = false;
	interval = null; 
	stop_driving = false; 
	modal_toggle = true;
	warehouse_detail  = 0; 
	program_value = 0; 
	@ViewChild('lager') lager;
	
	constructor(private service : DashboardService, private modalService: NgbModal){
	}

	ngOnInit(){
		this.service.sendData(["info_start",null, null]).subscribe(res => {
			if(res != null ){
				try{
					this.start = res["start"];
					this.autotag = res["autotag"];
					this.lager_fahren = res["lager_fahren"];
					this.stop_driving=res["stop_driving"]; 
					this.warehouse_detail = res["warehouse_detail"];
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
		this.interval = setInterval(() => {this.receiveProgramInfo();} ,1000); 

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
		  		this.warehouse_detail  = warehouse_message;
		  	}
		  	if(this.lager_fahren && this.lager.part.id == null )
		  		return;
		  	if(!this.lager_fahren)
		  		this.warehouse_detail = 0;
		}
		if (main_message == "lager")
		{
			detail_message = this.lager_fahren;
		}
		if(main_message == "autotag")
		{
			detail_message = this.autotag;
		}
	    console.log([main_message, detail_message, warehouse_message]);
	  	
	    this.service.sendData([main_message, detail_message, warehouse_message]).subscribe();
	     }

	receiveProgramInfo(){
	  	if(this.start){
		  	this.service.sendData(["program_info", null ,null]).subscribe(res => {
		        try{
		          if(res == null){
		            console.log("Keine Programmdaten erhalten");
		          }
		          else{
		          	let x = res["program"]; 
		          	this.program = this.program_json[x];
		          	this.program_value = x;
		          }
		      	} 
		      	catch(e)
		      	{
		      		this.program = "Fehler, Programm nicht gefunden!";
		      		console.log("Fehler beim Empfang der Programmdaten");
		      	} 
		      	if (this.program_value == 13)
		      	{

		      		if(this.modal_toggle){
		      			this.modal_toggle = false;
		      			this.showStaticModal();
		      			
		      		}
		      	}
		      	else{
		      		this.modal_toggle = true;
		      	}	

		      });
		}
  	}
    showStaticModal() {
    	if(this.warehouse_detail != 0){
		    const activeModal = this.modalService.open(ModalComponent, {
		      size: 'lg',
		      backdrop: 'static',
		      container: 'nb-layout',
		    });
		    activeModal.componentInstance.teil = this.warehouse_detail;
		    activeModal.componentInstance.modalHeader = 'Entnommene Teile';
		    activeModal.componentInstance.modalContent = 'Trage hier die Anzahl der Teile ein, die du entnommen hast:';
		}
	}

}
