import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { TodayWeatherService } from '../today-weather.service';
import { WeatherEvent } from '../weather-event';
@Component({
  selector: 'app-choix-planete',
  templateUrl: './choix-planete.component.html',
  styleUrls: ['./choix-planete.component.css']
})

export class ChoixPlaneteComponent implements OnInit {
  math = Math;
  i:number 
  data:any;
  planetArray:any;

  displayTravel:boolean;
  lightYearAway:number;
  travelCost:number;
  planetToGo:string

  todayData:WeatherEvent[];


  apiKey: string = "OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs";
  submitted: boolean = false;
  loading: boolean = true;
  todayLoading: boolean = true;
  todayEvent: string[] = ["CME", "GST", "IPS", "FLR", "SEP", "MPC", "RBE", "HSS"];
  dataArray = [];
  

  goToPlanet(a:number){
    console.log(a)
    this.displayTravel = true;
    this.planetArray = this.data[a];
    this.planetToGo = this.planetArray[0].pl_name;
    this.lightYearAway = ((this.planetArray[0].st_dist)*3.26156);
    this.travelCost = (this.lightYearAway*150000);
  }
  goBack(){
    this.displayTravel = false;
  }
  constructor(private myService:PlanetsService , private todayService: TodayWeatherService) {
    this.data=[];
    this.todayData = [];
   }
  
  ngOnInit() {
    this.data=[];

    this.myService.getPlanets().subscribe(
      (param_data:any[])=>{
        this.data = param_data;
        
      }
    );
    for (let eventValue of this.todayEvent) {
      this.todayService.getTodayNasaWeather(this.apiKey, eventValue).subscribe(
        (param_data: WeatherEvent[]) => {
          if (param_data != null){
          this.dataArray.push(param_data);
          }
          console.log("data array "+this.dataArray);
        }
      )
    }
    if (!this.dataArray[1]){
      this.todayLoading = false;
    }
    this.todayData = this.dataArray;
    
    console.log("today loading" +this.todayLoading);
    console.log("today data "+this.todayData);

  }
  
}

