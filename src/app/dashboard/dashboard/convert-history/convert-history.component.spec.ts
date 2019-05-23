import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertHistoryComponent } from './convert-history.component';
import { DashboardComponent } from '../dashboard.component';
import { ConvertComponent } from '../convert/convert.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

describe('ConvertHistoryComponent', () => {
  let component: ConvertHistoryComponent;
  let fixture: ComponentFixture<ConvertHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertHistoryComponent, DashboardComponent, ConvertComponent],
      imports: [SharedModule, DashboardRoutingModule, NoopAnimationsModule],
      providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
