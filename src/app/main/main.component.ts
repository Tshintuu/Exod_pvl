import { Component, OnInit } from '@angular/core';
import { ApodService, Apod } from '../apod.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  apod:Apod;
  shownews:boolean =false;
  news1title:string;
  news2title:string;
  news1:string;
  news2:string;

  setNews1(){
    this.shownews =true;
    this.news1title = 'Breaking News'
    this.news1 = 'Three student held hostage by their campus manager, claiming he want to know everything about a single minor feature'
    console.log(this.news1)
  }
  setNews2(){
    this.shownews =true;
    this.news2title = '⚠ Meteorological danger ⚠'
    this.news2 = 'Very fast man running at incredible speed'
  }
  constructor(private apodService : ApodService) {
    
   
   }

  ngOnInit() {
    this.apodService.getApod().subscribe(
      (data: Apod) => this.apod = {
        image: data['url'],
        title: data['title'],
        explanation: data['explanation'],
       });
    }
 

}
