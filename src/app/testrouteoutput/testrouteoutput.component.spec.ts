import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestrouteoutputComponent } from './testrouteoutput.component';

describe('TestrouteoutputComponent', () => {
  let component: TestrouteoutputComponent;
  let fixture: ComponentFixture<TestrouteoutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestrouteoutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestrouteoutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
