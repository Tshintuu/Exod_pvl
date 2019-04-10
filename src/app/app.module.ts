import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { SandboxComponent } from './sandbox/sandbox.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TestrouteoutputComponent } from './testrouteoutput/testrouteoutput.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'saucisse', component: TestrouteoutputComponent },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [TestrouteoutputComponent]
})*/



@NgModule({
  declarations: [
    AppComponent,
   // SandboxComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    TestrouteoutputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class FeatureRoutingModule {}
/*
import { AppComponent } from './app.component';
//import { SandboxComponent } from './sandbox/sandbox.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
*/