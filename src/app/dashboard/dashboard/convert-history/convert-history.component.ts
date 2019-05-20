import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ConvertHistory, ConvertInput } from 'src/app/shared/models';

@Component({
  selector: 'mx-convert-history',
  templateUrl: './convert-history.component.html',
  styleUrls: ['./convert-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertHistoryComponent implements OnInit {
  @Input() convertionHistory: ConvertHistory[];
  @Output() repeat: EventEmitter<ConvertInput> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  trackByFn(index, item) {
    return item.id;
  }

  repeatConversion(convertInput: ConvertInput) {
    this.repeat.emit(convertInput);
  }
}
