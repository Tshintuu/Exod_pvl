import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
@Component({
  selector: 'app-choix-planete',
  templateUrl: './choix-planete.component.html',
  styleUrls: ['./choix-planete.component.css']
})
export class ChoixPlaneteComponent implements OnInit {

  data:any;


  constructor(private myService:PlanetsService) {

    this.data=[];

    this.myService.getPlanets().subscribe(
      (param_data:string[])=>{
        this.data = param_data;
      }
    );
   }

  ngOnInit() {
  }

}
