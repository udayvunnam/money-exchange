import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Currency, ConvertHistory, ConvertOutput, ConvertInput } from 'src/app/shared/models';

@Component({
  selector: 'mx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  repeatConversion: ConvertInput = {};
  currencyList: Currency[] = [];
  convertOutput: ConvertOutput;
  conversionHistory: ConvertHistory[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getCurrencyList();
    this.getPastConversions();
  }

  getCurrencyList() {
    this.dashboardService.getCurrencies().subscribe(res => {
      this.currencyList = this.transformCurrencies(res);
    });
  }

  getPastConversions() {
    this.dashboardService.getUsage().subscribe((res: ConvertHistory[]) => {
      this.conversionHistory = res;
    });
  }

  convert(convertInput: ConvertInput) {
    this.dashboardService.convert(convertInput).subscribe((convertOutput: ConvertOutput) => {
      this.convertOutput = convertOutput;
      this.getPastConversions();
    });
  }

  repeat(conversion: ConvertInput) {
    this.repeatConversion = conversion;
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
