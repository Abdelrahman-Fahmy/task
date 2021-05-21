import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form:FormGroup;
  departments:string[]=['option one','option two','option three','option four'];
  alert:boolean=false;
  constructor(private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form=new FormGroup({
      name:new FormControl(null,Validators.required),
      department:new FormControl(null,Validators.required),
      code:new FormControl(null,[Validators.required,this.postiveNumber]),
      birthday:new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'),Validators.required),
      gender:new FormControl(null,Validators.required),
    });
  }

  postiveNumber(control:AbstractControl):{ [key: string]: boolean; } | null {
    if (Number(control.value) < 0) {
      return {postive: true};
    } else {
      return null;
    }
  }

  save(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }else{
      let employees:Employee[]=JSON.parse(localStorage.getItem('employees') as string);
      employees.push(this.form.value);
      localStorage.setItem('employees',JSON.stringify(employees));
      this.form.reset(
        {birthday:this.datePipe.transform(new Date(), 'yyyy-MM-dd')}
      );
      this.alert=true;
      setTimeout(() => {
        this.alert=false;
      }, 4000);
    }
  }

}
