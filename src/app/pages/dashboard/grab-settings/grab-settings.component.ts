import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grab-settings',
  templateUrl: './grab-settings.component.html',
  styleUrls: ['./grab-settings.component.scss']
})
export class GrabSettingsComponent implements OnInit {
	colors  = [{
		name:"Schwarzes Teil",
		id:1
	},
	{
		name:"Rotes Teil",
		id:2
	},
	{
		name:"Silbernes Teil",
		id:3
	}];
	part= {name: "<Auswählen>", value: null};
  constructor() { }

  ngOnInit() {
  }

}
