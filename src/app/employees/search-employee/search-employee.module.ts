import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchEmployeeRoutingModule } from './search-employee-routing.module';
import { SearchEmployeeComponent } from './search-employee.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchEmployeeComponent
  ],
  imports: [
    CommonModule,
    SearchEmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class SearchEmployeeModule { }
