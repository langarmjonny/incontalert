import { Component, OnInit } from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import 'rxjs/add/operator/map';


class Position{
  //top: pixel number measured from the top of the picture
  //left: pixel number measured from the top of the picture
  //x: kinexon x position
  //y: kinexon y position
  x: number; 
  y: number; 
  top: number; 
  left: number;
  visible= false;
  constructor(top: number,left: number , x: number, y: number){
    this.x = x; 
    this.y = y; 
    this.left = left; 
    this.top = top;  
  }
  getLeftTop(){
    return [this.left, this.top];
  }
  getXY(){
    return[this.x,this.y];
  }
  setVisibility(v:boolean){
    this.visible = v; 
  }
  toggleVisibility(){
    this.visible = !this.visible; 
  }
}
class AdvancedPosition extends Position{
  phi = 0; 
  mirrored = false;
  constructor(top: number,left: number , x: number, y: number, phi:number, mirrored: boolean){
    super(top, left, x,y); 
    this.phi = phi;
    this.mirrored = mirrored; 
  }
}

@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

	point1: boolean = false;
	point2: boolean = false;
  halle = {y: 497, x:  1543};
	cols = 60; 
	rows = 20;
  name = "Rects"; 
  content:string; 
	rects = [];
	values= [{color : "rgba(200, 0,0, 0.4)", value : -1},{color: "rgba(0, 255,0, 0.4)", value : 1},{color: "rgba(250, 250, 100, 0.4)", value : 2},{color: "rgba(250, 130, 0, 0.4)", value : 3}];
	difficulty= this.values[1];
  cross1 = new Position(10,10, null null);
  cross2 = new Position(20,20,null ,null);
  xy = new AdvancedPosition(100, 100 , 0 , 0, 0, false); 
  robotino = new Position(0, 0 , null ,null); 

  constructor(private postService: DashboardService) { }


  ngOnInit() {
  	this.getAreaData();
    setInterval(() => {this.receiveRobotinoInfo();} ,2000); 
  }
  //toggle CrossButton, only one at a time
  toggleCrossButton(cross){
    if (cross == this.cross1){
      this.point1 = !this.point1;
      if(this.point1)
        this.point2 = false;
    }
    if (cross == this.cross2){
      this.point2 = !this.point2;
      if(this.point2)
        this.point1 = false;
    }
  }

  changePosition(e){
  	if(this.point1) {
  		this.cross1.visible = true;
	  	this.cross1.left = e.offsetX -15 ;
	  	this.cross1.top =  e.offsetY -15;
  	}
  	if(this.point2) {
  		this.cross2.visible = true;
  	  this.cross2.left =  e.offsetX -15;
  	  this.cross2.top =  e.offsetY -15 ;
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
          if(i.value == parseInt(e)){
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
      x: this.xy.left, 
      y: this.xy.left,
      phi: this.xy.phi,
      mirrored: this.xy.mirrored,
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
  	this.postService.sendData(["area_write", data,null]).subscribe(
      null,  
      error => {
         console.error("Error sending area data: "+error.message);
       }); 
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
              this.xy.top = res["y"];
              this.xy.left = res["x"];
              this.xy.phi = res["phi"];
              this.rows = res["rows"];
              this.cols = res["cols"];
            }
            else{
              console.log("Keine Areadaten vorhanden");
            }
           }
          catch(e){
            console.error("Fehler Array Daten: "+ e.message);
          }
       }, 
       error => {
         console.error("Error Backend Commmunication: "+error.message);
         this.generateRectArray();
       },
       ()=> this.generateRectArray());     
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
        console.error("Fehler TagDaten: "+e); 
      }
    });
  }
  getAxis(){
    let a = this.cross2.x -this.cross1.x;
    let b = this.cross2.y -this.cross1.y; 
    let c = this.cross2.left -this.cross1.left; 
    let d = this.cross2.top -this.cross1.top;  
    // Wenn kein 2D Raum aufgespannt wird
    if(a == 0 || b == 0 ){
      console.error("Kein eindeutiges Koordinatensystem");
      return; 
    }
    //Wanung wenn Werte zu nah beieinanderliegen
    let ab_warning = 200; 
    if( Math.abs(a]) < ab_warning || Math.abs(b) < ab_warning )
    {
      console.warn("Bitte weiter auseinanderliegende Orte waehlen");
    }
    //
    this.xy.left= c/a * (a- this.cross2.x)+ this.cross1.left; 
    this.xy.top = d/b * (b -this.cross2.y) + this.cross1.top;
    console.log((c/a - d/b) +" und " + (c/ b - d/a) );
    console.log(this.xy.left + " "+ this.xy.top);
    console.log("Alternative: "+ (c/b * (b- this.cross2.y)+ this.cross1.left));
    console.log("Alternative: "+ (d/a * (a -this.cross2.x) + this.cross1.top));
    let  e ,f, phi_kinexon, phi_pixel; 
    if((Math.pow(this.cross1.x)+Math.pow(this.cross1.y)) > (Math.pow(this.cross2.x)+Math.pow(this.cross2.y))){
       phi_kinexon = Math.atan(this.cross1.y / this.cross1.x);
       phi_pixel = Math.atan(-this.cross1.top/ this.cross1.left);
       e = this.cross1.left - this.xy.left;
       f = this.cross1.top - this.xy.top;
    }
    else{
      phi_kinexon = Math.atan(this.cross2.y / this.cross2.x);
      phi_pixel = Math.atan(-(this.cross2.top- this.xy.top)/ (this.cross2.left-this.xy.left));
      e = this.cross2.left - this.xy.left;
      f = this.cross2.top - this.xy.top;
      //this.xy.phi = phi_kinexon - phi_pixel;
    }
    //this.xy.phi =  Math.acos((this.cross1.x * this.cross1.left  + this.cross1.y * this.cross1.top ) / (Math.sqrt(Math.pow(this.cross1.x ,2 ) + Math.pow(this.cross1.y,2) )  * (Math.sqrt(Math.pow(this.cross1.left ,2 ) +Math.pow(this.cross1.top,2 ) ) ) ) )  * 360 / (2 * Math.PI ); 
    phi_pixel *=  360 / (2 * Math.PI) ;
    phi_kinexon *=  360 / (2 * Math.PI) ;

    if(e >= 0 && f >= 0)
      this.xy.phi = phi_kinexon - phi_pixel;
    else if(e <0 && f >=  0)
      this.xy.phi =  180 + phi_kinexon - phi_pixel;
    else if(e >=0 && f <  0)
      this.xy.phi =  phi_kinexon - phi_pixel;
    else if(e <0 && f <  0)
      this.xy.phi =    180 + phi_kinexon - phi_pixel;
    console.log( this.xy.phi);
    this.xy.visible = true;
    if(this.xy.left >= this.halle.x || this.xy.left <  0 || this.xy.top >= this.halle.y || this.xy.top < 0)
      this.xy.visible = false;
      console.warn("Nullpunkt außerhalb des Sichtfeldes");
  }
  receiveRobotinoInfo(){
    if(this.robotino_visible){
      this.postService.sendData( ["robotino_pos", null, null]).subscribe(res => {
        try{
          let x = res["x"]; 
          let y = res["y"];
          if( x != null && y != null)
          {
            this.position_robotino.left = x +20; 
            this.position_robotino.top = y +20; 
          }

        }
        catch(e)
        {
          console.log("Fehler RobotinoDaten");
        }
      },
       error => {
         console.error("Error Robotino Postion Backend Commmunication: "+error.message);
       }
      );
    }
  }
}