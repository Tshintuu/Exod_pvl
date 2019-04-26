import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private myService:HttpClient) { }

public getPlanets():Observable<string[]>{
  return this.myService.get("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_orbper,pl_bmassj,pl_radj,rowupdate,pl_eqt,pl_msinie,st_dist,ra,dec&order=dec&format=json").pipe(
    map(
      (param_data:any)=>{
        
        let results:any[]=[];
        let currentData=null;
        for (let i=0; i<9; i++){
          currentData = param_data[i];
          results.push([currentData]);
        }
        return results;
      }
    )  
  )
}

}








// https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,ra,dec&order=dec&format=ascii
