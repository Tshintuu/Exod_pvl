/* import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TweenLite } from 'gsap';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  @ViewChild('light')

  private _light: ElementRef;

  private get light(): HTMLElement {
    return this._light.nativeElement;
  }

  public activate(): TweenLite {
    return TweenLite.fromTo(this.light, 0.5, { className: ''}, { className: 'active'});
  }

  public inactivate(): TweenLite {
    return TweenLite.fromTo(this.light, 0.5, { className: 'active'}, { className: ''});
  }
  
  constructor() { }

  ngOnInit() {
  }

} */
