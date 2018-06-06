import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	left1 = 200;
	top1 = 200;
	top2 = 200;
	left2 = 200; 
	hidden1 = 'hidden';
	hidden2 = 'hidden'; 
	point1: boolean = false;
	point2: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  setPoint(point){
  	if(1== point)
  		this.point1 = !this.point1;
  		if(this.point1)
  			this.point2 = false;
  	if (2 == point)
  		this.point2 = !this.point2;
  		if(this.point2)
  			this.point1 = false; 

  }
  changePosition(e){
  	if(this.point1) {
  		this.hidden1 = 'visible';
	  	this.left1 = parseInt(e.offsetX) +  parseInt(document.getElementById('x1').getAttribute('width'));
	  	this.top1 =  parseInt(e.offsetY) +  parseInt(document.getElementById('x1').getAttribute('height')) ;
	}
	if(this.point2) {
		this.hidden2 = 'visible';
	  	this.left2 =  parseInt(e.offsetX) +  parseInt(document.getElementById('x2').getAttribute('width'));
	  	this.top2 =  parseInt(e.offsetY) +  parseInt(document.getElementById('x2').getAttribute('height'));
	}
  	console.log(e); 
  }
}
