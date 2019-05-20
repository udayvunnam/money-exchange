import {
  Component,
  Output,
  OnInit,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChange,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  Currency,
  ConvertHistory,
  ConvertInput,
  ConvertOutput
} from 'src/app/shared/models';
import { DashboardService } from '../../dashboard.service';
import { MatSnackBar } from '@angular/material';
import { MxValidators } from 'src/app/shared/validators/mx-validators';
@Component({
  selector: 'mx-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertComponent implements OnInit, OnChanges {
  @Input() currencyList: Currency[];
  @Input() convertInput: ConvertInput;
  @Input() convertOutput: ConvertOutput;

  @Output() convert: EventEmitter<ConvertInput> = new EventEmitter();

  conversionForm: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.onFormChanges();
  }

  createForm() {
    this.conversionForm = this.fb.group(
      {
        from: [this.convertInput.from, [Validators.required]],
        to: [this.convertInput.to, [Validators.required]],
        value: [
          this.convertInput.value,
          [Validators.required, MxValidators.number]
        ]
      },
      { validators: MxValidators.notEqual('from', 'to') }
    );
  }

  getExchangeRate() {
    const convertInput: ConvertInput = {
      from: this.conversionForm.get('from').value,
      to: this.conversionForm.get('to').value,
      value: this.conversionForm.get('value').value
    };
    this.convert.emit(convertInput);
  }

  onFormChanges(): void {
    this.conversionForm.valueChanges.subscribe(val => {
      this.convertOutput = undefined;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.convertInput &&
      changes.convertInput.previousValue !== changes.convertInput.currentValue
    ) {
      this.createForm();
    }
  }

  getError(form: AbstractControl, isSubmitted: false) {
    let errorMsg: string;
    if (form.invalid && (isSubmitted || form.dirty)) {
      const amount = form.get('value');
      if (amount.hasError('required')) {
        errorMsg = 'Amount is required';
      } else if (amount.hasError('number')) {
        errorMsg = 'Please enter a valid Amount';
      } else if (form.get('from').hasError('required')) {
        errorMsg = 'From currency selection is required';
      } else if (form.get('to').hasError('required')) {
        errorMsg = 'To currency selection is required';
      } else if (form.hasError('equal')) {
        errorMsg = 'Conversion between same currencies! Are you sure ?';
      }
    }
    return errorMsg;
  }
}
