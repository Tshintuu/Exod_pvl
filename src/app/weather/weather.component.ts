import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherEvent } from '../weather-event';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data:WeatherEvent[];
  

  apiKey:string = "OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs";

  constructor(private myService:WeatherService) {

    this.data = [];

    
    
    

   }

   @Input() eventDate = {
    start:'yyyy-MM-dd',
    end:'yyyy-MM-dd',
    type: 'ALL'
  };


  ngOnInit() {
    this.myService.getNasaWeather(this.eventDate.type, this.eventDate.start, this.eventDate.end, this.apiKey).subscribe(
      (param_data:WeatherEvent[]) => {
        this.data = param_data;
      }
    );
  }

}
