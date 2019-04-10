import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data:any;
  eventDate = {
    start:'',
    end:''
  }

  constructor(private myService:WeatherService) {

    this.data = [];

    this.myService.getNasaWeather().subscribe(
      (param_data:string[]) => {
        this.data = param_data;
      }
    );
   }

  ngOnInit() {
  }

}
