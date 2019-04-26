import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  WeatherService
} from '../weather.service';
import {
  TodayWeatherService
} from '../today-weather.service';
import {
  WeatherEvent
} from '../weather-event';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data: WeatherEvent[];
  todayData:WeatherEvent[];


  apiKey: string = "OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs";
  submitted: boolean = false;
  loading: boolean = true;
  todayLoading: boolean = true;
  todayEvent: string[] = ["CME", "GST", "IPS", "FLR", "SEP", "MPC", "RBE", "HSS"];
  dataArray = [];

  searchSubmit() {
    this.submitted = true;
  }

  constructor(private myService: WeatherService, private todayService: TodayWeatherService) {

    this.data = [];
    this.todayData = [];





  }

  @Input() eventDate = {
    start: 'yyyy-MM-dd',
    end: 'yyyy-MM-dd',
    type: 'ALL'
  };


  ngOnInit() {
    this.data = [];
    this.myService.getNasaWeather(this.eventDate.type, this.eventDate.start, this.eventDate.end, this.apiKey).subscribe(
      (param_data: WeatherEvent[]) => {
        this.data = param_data;
        if (this.data == null) {
          this.loading = false;
        }
        console.log("loading : " + this.loading);
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
