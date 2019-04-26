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
          
          //In case there isn't any data to display
          if(param_data == null){
            
            console.log("No data!");
            return(null);
          }

          for (let i: number = 0; i < param_data.length; i++) {

            //defining an index number in order to retrieve the right object property depending on the object
            let eventName:string;
            let idIndex: number = null;
            let dateIndex:number = null;
            let locationIndex:number = null;
            let analysisIndex: number = null;
            
            

            switch (type) {
              case 'FLR':
                  eventName="Solar Flare";
                  idIndex = 0;
                  dateIndex = 2;
                  break;
                case 'SEP':
                  eventName="Solar Energetic Particle";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'CME':
                  eventName="Coronal Mass Ejection";
                  idIndex = 0;
                  dateIndex = 1;
                  locationIndex = 5;
                  break;
                case 'IPS':
                  eventName="Interplanetary Shock";
                  idIndex = 1;
                  dateIndex = 3;
                  locationIndex = 2;
                  break;
                case 'MPC':
                  eventName="Magnetopause Crossing";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'GST':
                  eventName="Geomagnetic Storm";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'RBE':
                  eventName="Radiation Belt Enhancement";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'HSS':
                  eventName="High Speed Stream";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'WSAEnlilSimulations':
                  eventName="WSA ENLIL+Cone Model";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
            }
            currentData = param_data[i];
            //get property name and assign its value to the corresponding WeatherEvent object property 
            let idObjectProperty:string[] = Object.getOwnPropertyNames(currentData);
            let idDescriptor = Object.getOwnPropertyDescriptor(currentData, idObjectProperty[idIndex]);

            let dateObjectProperty:string[] = Object.getOwnPropertyNames(currentData);
            let dateDescriptor = Object.getOwnPropertyDescriptor(currentData, dateObjectProperty[dateIndex]);

            let locationObjectProperty:string[] = Object.getOwnPropertyNames(currentData);
              let locationDescriptor = Object.getOwnPropertyDescriptor(currentData, locationObjectProperty[locationIndex]);

            //currentEvent.push("activityID: " + descriptor.value + " Start time : " + currentData.startTime);
            //results.push(currentEvent);

            let ev:WeatherEvent = new WeatherEvent();

            
            ev.type = eventName;
            ev.id = idDescriptor.value;
            ev.date = dateDescriptor.value;
            locationDescriptor ? ev.location = locationDescriptor.value: null;
            if (type == 'CME'){
              let analyses = currentData.cmeAnalyses;
              let coordinates = analyses[0];
              ev.latitude = coordinates.latitude;
              ev.longitude = coordinates.longitude;
            }

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
