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
import {
  WeatherEvent
} from './weather-event';

@Injectable({
  providedIn: 'root'
})
export class TodayWeatherService {

  constructor(private myService: HttpClient) {}

  public getTodayNasaWeather(apiKey: string, eventValue: string): Observable < WeatherEvent[] > {
    //get the current date
    let today: Date = new Date();
    let currentDate = today.getFullYear().toString();
    today.getMonth() > 9 ? currentDate += "-" + (today.getMonth() + 1) : currentDate += "-0" + (today.getMonth() + 1);
    currentDate += "-" + today.getDate();

    let baseUrl: string = "https://api.nasa.gov/DONKI/";
    const params = new HttpParams()
      .set('startDate', currentDate)
      .append('endDate', currentDate)
      .set('api_key', apiKey);
    let results: WeatherEvent[] = [];



      console.log(baseUrl + eventValue + "?" + params.toString())
      return this.myService.get(baseUrl + eventValue + "?", { params }).pipe(
        map(
          (param_data: any) => {


            let currentData = null;

            //In case there isn't any data to display
            if (param_data == null) {

              console.log("No data!");
              return (null);
            }

            for (let i: number = 0; i < param_data.length; i++) {

              //defining an index number in order to retrieve the right object property depending on the object
              let eventName: string = "";
              let idIndex: number = null;
              let dateIndex: number = null;
              let locationIndex: number = null;
              let analysisIndex: number = 0;



              switch (eventValue) {
                case 'FLR':
                  eventName = "Solar Flare";
                  idIndex = 0;
                  dateIndex = 2;
                  break;
                case 'SEP':
                  eventName = "Solar Energetic Particle";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'CME':
                  eventName = "Coronal Mass Ejection";
                  idIndex = 0;
                  dateIndex = 1;
                  locationIndex = 5;
                  break;
                case 'IPS':
                  eventName = "Interplanetary Shock";
                  idIndex = 1;
                  dateIndex = 3;
                  locationIndex = 2;
                  break;
                case 'MPC':
                  eventName = "Magnetopause Crossing";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'GST':
                  eventName = "Geomagnetic Storm";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'RBE':
                  eventName = "Radiation Belt Enhancement";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'HSS':
                  eventName = "High Speed Stream";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
                case 'WSAEnlilSimulations':
                  eventName = "WSA ENLIL+Cone Model";
                  idIndex = 0;
                  dateIndex = 1;
                  break;
              }

              currentData = param_data[i];

              //get property name and assign its value to the corresponding WeatherEvent object property 
              let idObjectProperty: string[] = Object.getOwnPropertyNames(currentData);
              let idDescriptor = Object.getOwnPropertyDescriptor(currentData, idObjectProperty[idIndex]);

              let dateObjectProperty: string[] = Object.getOwnPropertyNames(currentData);
              let dateDescriptor = Object.getOwnPropertyDescriptor(currentData, dateObjectProperty[dateIndex]);

              let locationObjectProperty: string[] = Object.getOwnPropertyNames(currentData);
              let locationDescriptor = Object.getOwnPropertyDescriptor(currentData, locationObjectProperty[locationIndex]);


              let todayEv: WeatherEvent = new WeatherEvent();

              todayEv.location = "unknown";
              todayEv.type = eventName;
              todayEv.id = idDescriptor.value;
              todayEv.date = dateDescriptor.value;
              locationDescriptor ? todayEv.location = locationDescriptor.value : null;

              if (eventValue == 'CME') {
                let analyses = currentData.cmeAnalyses;
                let coordinates = analyses[0];
                todayEv.latitude = coordinates.latitude;
                todayEv.longitude = coordinates.longitude;
              }

              results.push(todayEv);
              //currentEvent = [];
            }

            return results;

          }
        )
      )
  }
}
