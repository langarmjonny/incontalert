import { Component, OnInit } from '@angular/core';


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
	visible1 = false;
	visible2 = false; 
	point1: boolean = false;
	point2: boolean = false;
  cols = 40; 
  rows = 20; 
  rects = [];
  values= [{color : "", value : -1},{color: "rgba(255, 0,0, 0.5)", value : 1},{color: "rgba(163, 255, 209, 0.5)", value : 2}];
  difficulty= this.values[1];

  constructor() { }

  ngOnInit() {
    this.generateRectArray(null);
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
     console.log(this.left1 + " " + this.top1);
  	}
  	if(this.point2) {
  		this.visible2 = true;
  	  	this.left2 =  e.offsetX -15;
  	  	this.top2 =  e.offsetY -15 ;
  	}
  }
  generateRectArray(values){
    this.rects = [];
    for(var i= 0; i < this.rows; i++ )
    {
      for(var j=0; j < this.cols; j++)
        {
          this.rects.push({
            x:Math.floor( j * 1500 / this.cols),
            y:Math.floor( i * 702 / this.rows),
            value: this.values[2],
            width: Math.floor(1500 / this.cols),
            height: Math.floor(702 / this.rows),
          })
        }
    }
    console.log(this.rects);
  }
  changeRectValue(rect){
    rect.value = this.difficulty;  
  }

}