import { NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConvertHistoryComponent } from './dashboard/convert-history/convert-history.component';
import { ConvertComponent } from './dashboard/convert/convert.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, ConvertComponent, ConvertHistoryComponent],
  imports: [SharedModule, DashboardRoutingModule],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
})
export class DashboardModule {}
