import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {
  employees:Employee[]=[];
  totalList:Employee[]=[];
  checkedEmployees:Employee[]=[];
  form:FormGroup;
  departments:string[]=['option one','option two','option three','option four'];
  @ViewChildren('checkEmployee') checkEmployee: QueryList<ElementRef>;
  @ViewChild('checkAllEmployee') checkAllEmployee: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
    this.employees=JSON.parse(localStorage.getItem('employees') as string);
    this.totalList=this.employees;
  }

  createForm(){
    this.form=new FormGroup({
      name:new FormControl(null,Validators.required),
      department:new FormControl(null,Validators.required),
    });
  }

  search(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }else{
      this.employees=this.totalList.filter(e=>e.name.includes(this.form.get('name')?.value) && e.department.includes(this.form.get('department')?.value));
      this.toggleCheckAll(false);
      this.checkAllEmployee.nativeElement['checked']=false
    }
  }

  clearSearch(){
    this.form.reset();
    this.employees=this.totalList;
    this.toggleCheckAll(false);
    this.checkAllEmployee.nativeElement['checked']=false
  }

  toggleCheckAll(value:boolean){
    if(value===false){
      this.checkedEmployees=[];
      this.checkEmployee.forEach(e=>{
        e.nativeElement['checked']=false;
      });
    }else{
      this.checkedEmployees=[];
      this.employees.forEach(e=>{
        this.checkedEmployees.push(e);
      });
      this.checkEmployee.forEach(e=>{
        e.nativeElement['checked']=true;
      });
    }
  }

  onCheckEmployee(value:boolean,employee:Employee){
    if(value==true){
      this.checkedEmployees.push(employee);
      this.checkedEmployees.length === this.employees.length ? (this.checkAllEmployee.nativeElement['checked']=true) : null;
    }else{
      let index = this.checkedEmployees.findIndex(x => x.code ===employee.code);
      this.checkedEmployees.splice(index, 1);
      this.checkedEmployees.length < this.employees.length ? (this.checkAllEmployee.nativeElement['checked']=false) : null;
    }
  }

}
