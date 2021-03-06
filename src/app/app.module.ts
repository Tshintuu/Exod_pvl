import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ChoixPlaneteComponent } from './choix-planete/choix-planete.component';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { WeatherComponent } from './weather/weather.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TestrouteoutputComponent } from './testrouteoutput/testrouteoutput.component';
import { JobComponent } from './job/job.component';
import { ServicesComponent } from './services/services.component';
import { TravelComponent } from './travel/travel.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'menutest', component: TestrouteoutputComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'planets', component: ChoixPlaneteComponent },
  { path: 'job', component: JobComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'sandbox', component: SandboxComponent },

  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [TestrouteoutputComponent]
})*/



@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    WeatherComponent,
    SandboxComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    TestrouteoutputComponent,
    ChoixPlaneteComponent,
    JobComponent,
    ServicesComponent,
    TravelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class FeatureRoutingModule {}
export {routes};
/*
import { AppComponent } from './app.component';
//import { SandboxComponent } from './sandbox/sandbox.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
*/
