import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Currency, ConvertHistory } from 'src/app/shared/models';

@Component({
  selector: 'mx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currencyList: Currency[];
  convertionHistory: ConvertHistory[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getCurrencies().subscribe(res => {
      this.currencyList = this.transformCurrencies(res);
    });
    this.dashboardService.getUsage().subscribe(res => {
      this.convertionHistory = res;
    });
  }

  transformCurrencies(res): Currency[] {
    return Object.keys(res).reduce((currencyList, symbol) => {
      currencyList.push({
        symbol,
        fullName: res[symbol]
      });
      return currencyList;
    }, []);
  }
}
