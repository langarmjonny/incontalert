import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grab-settings',
  templateUrl: './grab-settings.component.html',
  styleUrls: ['./grab-settings.component.scss']
})
export class GrabSettingsComponent implements OnInit {
	colors  = [{
		name:"Schwarzes Teil",
		id:"schwarz"
	},
	{
		name:"Rotes Teil",
		id:"rot"
	},
	{
		name:"Silbernes Teil",
		id:"silber"
	}];
	part= {name: "<Auswählen>", value: null};
  constructor() { }

  ngOnInit() {
  }

}
