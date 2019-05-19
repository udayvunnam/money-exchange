import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, HttpClientModule, ReactiveFormsModule],
  exports: [CommonModule, MaterialModule, FlexLayoutModule, HttpClientModule, ReactiveFormsModule]
})
export class SharedModule {}
