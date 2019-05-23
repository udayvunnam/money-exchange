import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertComponent } from './convert.component';
import { DashboardComponent } from '../dashboard.component';
import { ConvertHistoryComponent } from '../convert-history/convert-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

describe('ConvertComponent', () => {
  let component: ConvertComponent;
  let fixture: ComponentFixture<ConvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertComponent, DashboardComponent, ConvertHistoryComponent],
      imports: [SharedModule, DashboardRoutingModule, NoopAnimationsModule],
      providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertComponent);
    component = fixture.componentInstance;
    component.repeatConversion = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
