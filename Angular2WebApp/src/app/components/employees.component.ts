import { Component/*, OnInit*/ } from '@angular/core';
import {EmployeeService} from '../services/employee.service';

@Component({
    moduleId: module.id,
    selector: 'employees',
    //template: `<h1>employees</h1>`,
    templateUrl:'./employees.component.html',
    styleUrls:['./employees.component.css'],
    providers:[EmployeeService]
})

export class EmployeesComponent /*implements OnInit*/ {
  employees:employee[];
  positions:string[];
  errors:string[] = [];

  // Constructor with EmployeeService (dependency injection).
  constructor(private employeeService: EmployeeService) {
    console.log('EmployeesComponent constructor');

    // Get positions from EmployeeService.
    this.employeeService.getPositions()
    .subscribe(value=>{
      console.log(value);
      this.positions = value.positions;
    });

    // Get employees from EmployeeService.
    this.employees = this.employeeService.getEmployees();
    this.initNewEmployee();
  }

  //  ngOnInit(){
  //    console.log('EmployeesComponent.ngOnInit()');
  //  }

  // Init new employee: Adds empty employee to array.
  initNewEmployee() {
    var newEmployee = {
      id: this.employees[this.employees.length-1].id+1,
      name: '',
      surname: '',
      position: '',
      date: '' // '2000-12-31' for develop
    };
    this.employees.push(newEmployee);
    this.errors.push('');
  }

  // Add employee: Validate employee and Init new employee.
  addEmployee(newEmployee:employee) {
    if(this.validateEmployee(newEmployee)) {
      // Todo: insert to datasource.
      this.initNewEmployee();
    }
  }

  // Update employee: Validate employee.
  updateEmployee(updatedEmployee:employee) {
    // Todo: update datasource.
    this.validateEmployee(updatedEmployee);
  }

  // Delete employee: Remove employee from array.
  deleteEmployee(i:number) {
    // Todo: delete from datasource.
    this.employees.splice(i, 1);
  }

  // Validate employee: Check length of name, surname and date.
  validateEmployee(employee:employee) {
    if (!employee.name || employee.name.length < 1){
     this.errors[employee.id] = 'Name required.';
     return false;
    }

    if (!employee.surname || employee.surname.length < 1) {
      this.errors[employee.id] ='Surname required.';
     return false;
   }

   if (!employee.date || employee.date.length < 1) {
    this.errors[employee.id] ='Date of birth required.';
     return false;
   }

   this.errors[employee.id] = null;
   return true;
  }
}

interface employee {
    id: number;
    name: string;
    surname: string;
    position: string,
    date: string;
}
