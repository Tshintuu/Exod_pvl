import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { PlanetPos } from '../planet-pos';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  data:any;
  planets:any;

  
  constructor(private myService:PlanetsService) { 
    this.data=[];
    this.planets=[];

    this.myService.getPlanets().subscribe(
      (param_data:any[])=>{
        this.data = param_data;
        let test = param_data[0];
        console.log(test[0].st_glon);


        let planet = [];
        let realDistance:number;
        let planeDistance:number; //Distance on the galactic plane (without the galactic latitude)
        let heightDistance:number; //Distance between the planet and the galactic plane
        let isAbove:number = 1; //Determine if the planet is above or below the galactic plane (depending on the latitude angle)
        for (let i = 0; i < this.data.length; i++){
          planet = this.data[i];
          console.log("fifouplanet" +planet[0]);
          for (let j = 0; j < planet.length; j++){
            if (planet[j].st_glat < 0) {
              isAbove = -isAbove;
            }
            realDistance = planet[j].st_dist;
            planeDistance = planet[j].st_dist * Math.cos(planet[j].st_glat * (Math.PI/180));
            heightDistance = planet[j].st_dist * Math.sin(planet[j].st_glat * (Math.PI/180));
            console.log(planet[j] +"is the planet, yeah");
            console.log(realDistance+"is the REAL distance, ooow yeah!");
            console.log(planeDistance+"is the distance to the image on the plane, awesome!")
            let planetPos = new PlanetPos;
            planetPos.name = planet[j].pl_name;
            planetPos.dist = planet[j].st_dist;
            planetPos.yPlaneCoord = -((planeDistance * Math.cos(planet[j].st_glon * (Math.PI/180)))) + 50; //Coordinates divided by 4 to stay in svg frame and added 50 because it is the origin.
            planetPos.xPlaneCoord = -((planeDistance * Math.sin(planet[j].st_glon * (Math.PI/180)))) + 50;
            planetPos.xCoord = planetPos.xPlaneCoord + 0.5;
            planetPos.yCoord = (((realDistance * Math.sin(planet[j].st_glon * (Math.PI/180)))/4) * isAbove * 0.5) + 50;
            planetPos.travelPath = "M50 50 L"+planetPos.xPlaneCoord.toString()+" "+planetPos.yPlaneCoord.toString();
            console.log("travel path : "+planetPos.travelPath);
            planetPos.heightColor = "rgb("+(heightDistance * isAbove + 127).toString()+","+(heightDistance * -isAbove + 127).toString()+",0)";
            this.planets.push(planetPos);
            console.log("x coord : "+planetPos.xCoord + " y coord : "+planetPos.yCoord);
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
