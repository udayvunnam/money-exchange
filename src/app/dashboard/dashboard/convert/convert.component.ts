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
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Currency, ConvertInput, ConvertOutput } from 'src/app/shared/models';
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
  conversionProgress: boolean;
  @Input() currencyList: Currency[];
  @Input() repeatConversion: ConvertInput;
  @Input() convertOutput: ConvertOutput;

  @Output() convert: EventEmitter<ConvertInput> = new EventEmitter();

  conversionForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
    this.onFormChanges();
  }

  createForm() {
    this.conversionForm = this.fb.group(
      {
        from: [this.repeatConversion.from, [Validators.required]],
        to: [this.repeatConversion.to, [Validators.required]],
        value: [this.repeatConversion.value, [Validators.required, MxValidators.number]]
      },
      { validators: MxValidators.notEqual('from', 'to') }
    );
  }

  getExchangeRate() {
    this.conversionProgress = true;
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
    if (changes.repeatConversion && changes.repeatConversion.previousValue !== changes.repeatConversion.currentValue) {
      const repeatData = changes.repeatConversion.currentValue;
      if (this.conversionForm) {
        this.conversionForm.setValue({
          from: repeatData.from,
          to: repeatData.to,
          value: repeatData.value
        });
      }
      window.scroll(0, 0);
    }

    if (changes.convertOutput) {
      this.conversionProgress = false;
    }
  }

  getError(form: AbstractControl, isSubmitted: false) {
    let errorMsg: string;
    if (form.invalid && (isSubmitted || form.dirty)) {
      const amount = form.get('value');
      if (amount.hasError('required') && (amount.dirty || isSubmitted)) {
        errorMsg = `'Amount' is required`;
      } else if (amount.hasError('number') && (amount.dirty || isSubmitted)) {
        errorMsg = 'Please enter a valid Amount';
      } else if (form.get('from').hasError('required') && (form.get('from').dirty || isSubmitted)) {
        errorMsg = `'From Currency' selection is required`;
      } else if (form.get('to').hasError('required') && (form.get('to').dirty || isSubmitted)) {
        errorMsg = `'To Currency' selection is required`;
      } else if (form.hasError('equal')) {
        errorMsg = 'Conversion between same currencies! Are you sure ?';
      }
    }
    return errorMsg;
  }
}
