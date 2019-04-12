import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WeatherComponent } from './weather/weather.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private myService:HttpClient) { }


  public getNasaWeather():Observable<string[]>{

    /*const url = `https://api.nasa.gov/DONKI/CME?startDate=${this.start}&endDate=2018-01-03&api_key=OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs`*/
    return this.myService.get("https://api.nasa.gov/DONKI/CME?startDate=2017-01-03&endDate=2018-01-03&api_key=OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs").pipe(
      map(
        (param_data:any) => {

          let currentEvent:string[]=[];
          let results:any[]=[];
          let currentData=null;
          for(let i:number=0; i<param_data.length; i++){
            currentData = param_data[i];
            currentEvent.push("activityID: "+currentData.activityID+" Start time : "+currentData.startTime);
            results.push(currentEvent);
            currentEvent = [];
          }
          
          return results;

        }
      )
    )
  }
}
