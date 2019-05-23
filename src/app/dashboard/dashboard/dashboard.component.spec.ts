import { DashboardComponent } from './dashboard.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvertComponent } from './convert/convert.component';
import { ConvertHistoryComponent } from './convert-history/convert-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardService } from '../dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, ConvertComponent, ConvertHistoryComponent],
      imports: [SharedModule, DashboardRoutingModule, NoopAnimationsModule],
      providers: [DashboardService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
