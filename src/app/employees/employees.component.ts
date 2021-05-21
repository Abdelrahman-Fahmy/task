import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees:Employee[]=[];
  constructor() { }

  ngOnInit(): void {
    if(!localStorage.getItem('employees')){
      localStorage.setItem('employees',JSON.stringify(this.employees));
    }
  }

}
