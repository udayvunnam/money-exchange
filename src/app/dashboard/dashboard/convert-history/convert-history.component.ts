import { Component, OnInit, Input } from '@angular/core';
import { ConvertHistory } from 'src/app/shared/models';

@Component({
  selector: 'mx-convert-history',
  templateUrl: './convert-history.component.html',
  styleUrls: ['./convert-history.component.scss']
})
export class ConvertHistoryComponent implements OnInit {
  @Input() convertionHistory: ConvertHistory[];

  constructor() {}

  ngOnInit() {}
}
