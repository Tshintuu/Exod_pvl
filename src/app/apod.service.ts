import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApodService {

  constructor(private http: HttpClient) { }
  apodUrl = ' https://api.nasa.gov/planetary/apod?api_key=OE0DRhS0bUx7mUrWVFDChv83k7DnfSvXEob3pohs ';
  public getApod() {
    return this.http.get(this.apodUrl);
  }
}
export class Apod {
  image: string;
  title: string;
  explanation: string;
}
