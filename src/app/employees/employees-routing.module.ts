import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'prefix' },
      { path: 'add', loadChildren: () => import('./add-employee/add-employee.module').then((m) => m.AddEmployeeModule) },
      { path: 'search', loadChildren: () => import('./search-employee/search-employee.module').then((m) => m.SearchEmployeeModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
