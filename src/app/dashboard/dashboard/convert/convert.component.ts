import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Currency, ConvertHistory, ConvertInput, ConvertOutput } from 'src/app/shared/models';
import { DashboardService } from '../../dashboard.service';
import { MatSnackBar } from '@angular/material';
import { MxValidators } from 'src/app/shared/validators/mx-validators';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'mx-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {
  @Input() currencyList: Currency[] = [];

  conversionForm: FormGroup;
  convertOutput: ConvertOutput;

  constructor(private dashboardService: DashboardService, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
    this.onChanges();
  }

  createForm() {
    this.conversionForm = this.fb.group(
      {
        from: ['', [Validators.required]],
        value: ['', [Validators.required, MxValidators.number]],
        to: ['', [Validators.required]]
      },
      { validators: MxValidators.notEqual('from', 'to') }
    );
  }

  convert() {
    const convertInput: ConvertInput = {
      from: this.conversionForm.get('from').value,
      to: this.conversionForm.get('to').value,
      value: this.conversionForm.get('value').value
    };
    this.dashboardService.convert(convertInput).subscribe((convertOutput: ConvertOutput) => {
      this.convertOutput = convertOutput;
    });
  }

  onChanges(): void {
    this.conversionForm.valueChanges.subscribe(val => {
      this.convertOutput = undefined;
    });
  }
  getError(form: AbstractControl) {
    let errorMsg: string;
    if (form.valid || !form.dirty) {
      return undefined;
    }
    const amount = form.get('value');
    if (amount.invalid && amount.dirty) {
      if (amount.hasError('required')) {
        errorMsg = 'amount is required';
      } else if (amount.hasError('number')) {
        errorMsg = 'please enter a number';
      }
    } else if (form.hasError('equal')) {
      errorMsg = 'same currencies! are you sure ?';
    }
    return errorMsg;
  }
}
