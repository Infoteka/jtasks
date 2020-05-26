import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NganttComponent } from './ngantt.component';

describe('NganttComponent', () => {
  let component: NganttComponent;
  let fixture: ComponentFixture<NganttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NganttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NganttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
