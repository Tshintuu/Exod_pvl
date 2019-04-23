import { Component, OnInit } from '@angular/core';
import { ApodService, Apod } from '../apod.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  apod : Apod;
  constructor(private apodService : ApodService) {
    
    this.apodService.getApod().subscribe(
      (data: Apod) => this.apod = {
        image: data['url'],
       });
   }

  ngOnInit() {
    
  }
 

}
