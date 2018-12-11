import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }      from '@angular/router';

import { EmployeesComponent }  from './components/employees.component';
import { AboutComponent }  from './components/about.component';

const appRoutes:Routes=[
    {path:'', component:EmployeesComponent},
    {path:'about', component:AboutComponent}];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
