import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPlaneteComponent } from './choix-planete.component';

describe('ChoixPlaneteComponent', () => {
  let component: ChoixPlaneteComponent;
  let fixture: ComponentFixture<ChoixPlaneteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixPlaneteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixPlaneteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
