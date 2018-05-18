import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grab-settings',
  templateUrl: './grab-settings.component.html',
  styleUrls: ['./grab-settings.component.scss']
})
export class GrabSettingsComponent implements OnInit {
	part_name: string = "<Auswählen>";
  constructor() { }

  ngOnInit() {
  }

}
