import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ConvertHistoryComponent } from './dashboard/convert-history/convert-history.component';
import { ConvertComponent } from './dashboard/convert/convert.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

@NgModule({
  declarations: [DashboardComponent, ConvertComponent, ConvertHistoryComponent],
  imports: [SharedModule, DashboardRoutingModule],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
})
export class DashboardModule {}
