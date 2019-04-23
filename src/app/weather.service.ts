import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import { WeatherEvent } from './weather-event';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {



  constructor(private myService: HttpClient) {}


  public getNasaWeather(type: string, start: string, end: string, apiKey: string): Observable < WeatherEvent[] > {

    //settings for url parameters
    let baseUrl: string = "https://api.nasa.gov/DONKI/" + type + "?";


    const params = new HttpParams()
      .set('startDate', start)
      .append('endDate', end)
      .set('api_key', apiKey);
    console.log(baseUrl + params.toString());
    return this.myService.get(baseUrl, {
      params
    }).pipe(
      map(
        (param_data: any) => {

          let currentEvent: string[] = [];
          let results: WeatherEvent[] = [];
          let currentData = null;
          for (let i: number = 0; i < param_data.length; i++) {

            //defining an index number in order to retrieve the right object property depending on the object
            let idIndex: number = 0;
            let dateIndex:number = 0;
            
            

            switch (type) {
              case 'FLR':
                idIndex = 0;
                dateIndex = 2;
                break;
              case 'SEP':
                idIndex = 0;
                break;
              case 'CME':
                idIndex = 0;
                dateIndex = 1;
                break;
              case 'IPS':
                idIndex = 1;
                break;
              case 'MPC':
                idIndex = 0;
                break;
              case 'GST':
                idIndex = 0;
                break;
              case 'RBE':
                idIndex = 0;
                break;
              case 'HSS':
                idIndex = 0;
                break;
              case 'WSAEnlilSimulations':
                idIndex = 0;
                break;
            }
            currentData = param_data[i];
            //get property name and assign its value to the corresponding WeatherEvent object property 
            let idObjectProperty:string[] = Object.getOwnPropertyNames(currentData);
            let idDescriptor = Object.getOwnPropertyDescriptor(currentData, idObjectProperty[idIndex]);

            let dateObjectProperty:string[] = Object.getOwnPropertyNames(currentData);
            let dateDescriptor = Object.getOwnPropertyDescriptor(currentData, dateObjectProperty[dateIndex]);

            //currentEvent.push("activityID: " + descriptor.value + " Start time : " + currentData.startTime);
            //results.push(currentEvent);

            let ev:WeatherEvent = new WeatherEvent();

            ev.location = "unknown";
            ev.id = idDescriptor.value;
            ev.date = dateDescriptor.value

            /*Conditions to retrieve data depending on type of event (the object structure is varying between each event)
            if( currentData.eventTime ) {
              ev.date = currentData.eventTime;
            } else if( currentData.)

            if( currentData.location )
              ev.date = currentData.location;*/

            
            console.log(ev);
            results.push(ev);
            //currentEvent = [];
          }

          return results;

        }
      )
    )
  }
}
