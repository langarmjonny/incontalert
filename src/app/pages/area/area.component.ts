import { Component, OnInit } from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';

@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	left1 = 300;
	top1 = 300;
	top2 = 200;
	left2 = 200; 
  leftxy = 100; 
  topxy = 100; 
  phixy = 0.0; 
	visible1 = false;
	visible2 = false; 
  visiblexy = false; 
	point1: boolean = false;
	point2: boolean = false;
	x1: number;
	x2: number; 
	y1: number; 
	y2: number;

	cols = 40; 
	rows = 20; 
	rects = [];
	values= [{color : "rgba(200, 0,0, 0.4)", value : -1},{color: "rgba(0, 255,0, 0.4)", value : 1},{color: "rgba(250, 250, 100, 0.4)", value : 2},{color: "rgba(250, 130, 0, 0.4)", value : 3}];
	difficulty= this.values[1];

  constructor(private postService: DashboardService) { }

  ngOnInit() {
  	this.getAreaData();
    this.generateRectArray();
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
  		this.visible1 = true;
	  	this.left1 = e.offsetX -15 ;
	  	this.top1 =  e.offsetY -15;
  	}
  	if(this.point2) {
  		this.visible2 = true;
  	  	this.left2 =  e.offsetX -15;
  	  	this.top2 =  e.offsetY -15 ;
  	}
  }
  generateRectArray(){
    this.rects = [];
    for(var i= 0; i < this.rows; i++ )
    {
      for(var j=0; j < this.cols; j++)
        {
          this.rects.push({
            x: j * 1500 / this.cols,
            y: i * 702 / this.rows,
            value: this.values[0],
            width: 1500 / this.cols,
            height: 702 / this.rows,
          })
        }
    }
  }
  changeRectValue(rect){
    rect.value = this.difficulty;  
  }
  refresh(){
  	this.generateRectArray();
  }
  save(){
    this.getAxis();
  	let data = { 
  		rows: this.rows,
  		cols: this.cols,
      x: 100, 
      y: 100,
      phi: 0.2,
      mirrored: 1, 
       /*

  		point1: {
  			top: this.top1,
  			left: this.left1,
  			x: this.x1,
  			y: this.y1 
  		},
  		point2: {
  			top: this.top2,
  			left: this.left2,
  			x: this.x2,
  			y: this.y2
  		},*/
  		content: this.rects
  	};
  	this.postService.sendData(data).subscribe(); 
  	
  }
  getAreaData(){
  	return;
  }
  recieveTagData(){
  	return;
  }
  getAxis(){
    // get  pixel of 0,0 point
    let a = this.x2 - this.x1; 
    let b = this.y2- this.y1; 
    let c = this.left2 -this.left1;
    let d = this.top2 - this.top1; 
    this.leftxy= c/a * (a- this.x2)+ this.left1; 
    this.topxy = d/b * (b -this.y2) + this.top1;
    this.phixy =  Math.acos((this.x1 * this.left1  + this.y1 * this.top1 ) / (Math.sqrt(Math.pow(this.x1 ,2 ) + Math.pow(this.y1,2) )  * (Math.sqrt(Math.pow(this.left1 ,2 ) +Math.pow(this.top1,2 ) ) ) ) )  * 360 / (2 * Math.PI ); 
    console.log(this.leftxy + " "+ this.topxy);
    this.visiblexy = true;

  }
}