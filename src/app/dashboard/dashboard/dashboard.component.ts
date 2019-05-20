import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {
  Currency,
  ConvertHistory,
  ConvertOutput,
  ConvertInput
} from 'src/app/shared/models';

@Component({
  selector: 'mx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  convertInput: ConvertInput = {};
  currencyList: Currency[] = [];
  convertOutput: ConvertOutput;
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

  convert(convertInput: ConvertInput) {
    this.dashboardService
      .convert(convertInput)
      .subscribe((convertOutput: ConvertOutput) => {
        this.convertOutput = convertOutput;
      });
  }

  repeat(convertInput: ConvertInput) {
    this.convertInput = convertInput;
    window.scroll(0, 0);
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
