import { Component, OnInit } from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	left1 = 10;
	top1 = 10;
	top2 = 20;
	left2 = 20; 
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
  halle = {y: 497, x:  1543};
	cols = 60; 
	rows = 20;
  name = "Rects"; 
  content:string; 
	rects = [];
	values= [{color : "rgba(200, 0,0, 0.4)", value : -1},{color: "rgba(0, 255,0, 0.4)", value : 1},{color: "rgba(250, 250, 100, 0.4)", value : 2},{color: "rgba(250, 130, 0, 0.4)", value : 3}];
	difficulty= this.values[1];
  constructor(private postService: DashboardService) { }

  ngOnInit() {
  	this.getAreaData();
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
    if(this.content == undefined || this.content == "")
    {
      for(var i= 0; i < this.rows; i++ )
      {
        for(var j=0; j < this.cols; j++)
          {
            this.rects.push({
              x: j * this.halle.x / this.cols,
              y: i * this.halle.y / this.rows,
              value: this.values[0],
              width: this.halle.x / this.cols,
              height: this.halle.y / this.rows,
            });

          }
      }
    }
    else {
      let array = this.content.split(',');
      array.map(x => parseInt(x));
      array.forEach((e, i) =>{
        let val = this.values[0]
        for(let i of this.values)
        {
          if(i.value == e){
            val = i; 
          }
        }
        this.rects.push({
          x: (i % this.cols) * this.halle.x / this.cols,
          y: ((i / this.cols)|0) * this.halle.y / this.rows,
          value: val,
          width: this.halle.x / this.cols,
          height: this.halle.y / this.rows,
        });
      });
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
    let values = []; 
    for(let rect of this.rects){
      values.push(rect.value.value);
    }
    this.content = values.toString();

  	let data = { 
      name: this.name,
  		rows: this.rows,
  		cols: this.cols,
      x: this.leftxy, 
      y: this.topxy,
      phi: this.phixy,
      mirrored: 1,
      scale_x_axis: 1,
      scale_y_axis: 1,
      content: this.content,
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
  	};
  	this.postService.sendData(["area_write", data,null]).subscribe(); 
  	
  }
  getAreaData(){
  	 this.postService.sendData(["area_read", null ,null]).subscribe(res => {
        try{
          if(res == null){
            console.log("Keine Responsedaten erhalten");
          }
          else if(res["NoData"] != true){
            this.name = res["name"];
            this.content =res["content"];
            this.topxy = res["y"];
            this.leftxy = res["x"];
            this.phixy = res["phi"];
            this.rows = res["rows"];
            this.cols = res["cols"];
          }
          else{
            console.log("Keine Areadaten vorhanden");
          }
         }
        catch(e){
          console.log("Fehler Array Daten: "+ e);
        }
        this.generateRectArray();
     });
  }
  recieveTagData(i){
  	this.postService.sendData(["get_benutzer_tag", null, null]).subscribe(res => {
      try{
        if(res != null){
          if(i == 1){
            this.x1 = res["x"];
            this.y1 = res["y"];
          }
          if(i == 2){
            this.x2 = res["x"];
            this.y2 = res["y"];
          }
        }
        else{
          console.log("Keine TagDaten");
        }
      }
      catch(e)
      {
        console.log("Fehler TagDaten: "+e); 
      }
    });
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
    if(this.leftxy >= this.halle.x || this.leftxy <  0 || this.topxy >= this.halle.y || this.topxy < 0)
      this.visiblexy = false;
  }
}