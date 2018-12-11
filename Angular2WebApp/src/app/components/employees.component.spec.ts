import { EmployeesComponent }  from './employees.component';
import {EmployeeService} from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/observable/of';

//https://vimeo.com/192320077
// class MockEmployeeService extends EmployeeService {
//     url = '';
//     getPositions(): Observable<any> {
//         var positions = {'positions' : ['full-stack developer','front-end developer','sw admin','help desk','scrum master','product manager']};
//         return Observable.of(positions);
//     }
// }

describe('EmployeesComponent', () => {
    let de: DebugElement;
    let comp: EmployeesComponent;
    let fixture: ComponentFixture<EmployeesComponent>;
    let testBedService: EmployeeService;
    //let mockService: MockEmployeeService;
  
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EmployeesComponent],
            imports: [ FormsModule, RouterTestingModule, HttpModule ],
            providers: [ {provide: EmployeeService} ]
        })
        .compileComponents()
        .then(()=>{
            // Assign mock service to tested component.
            // TestBed.overrideComponent(
            //     EmployeesComponent,
            //     {set: {providers: [ {provide: EmployeeService, useClass: MockEmployeeService } ]}}
            // );
            fixture = TestBed.createComponent(EmployeesComponent);
            comp = fixture.componentInstance;
            testBedService = TestBed.get(EmployeeService);
            //mockService = fixture.debugElement.injector.get(EmployeeService);
        });
    }));

     it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        inject([EmployeeService], (injectService: EmployeeService)=>{
            expect(injectService).toBe(testBedService);
        })
     );

    // it('testBedService.getEmployees()', ()=>{
    //     var employees = testBedService.getEmployees();
    //     expect(employees).not.toBeNull();
    // });

    // it('Service injected via component should be an instance of MockEmployeeService', ()=>{
    //     expect(mockService instanceof MockEmployeeService).toBeTruthy();
    // });

    // it('mockService.getEmployees()', ()=>{
    //     expect(mockService.getEmployees()).not.toBeNull();
    // });

    it('After start: 6 job positions', ()=>{
        expect(comp.positions).not.toBeNull();
        expect(comp.positions.length).toBe(6);
    });

    it('After start: 4 employees', ()=>{
        expect(comp.employees).not.toBeNull();
        expect(comp.employees.length).toBe(4);
    });

    it('initNewEmployee(): 5 employess', ()=>{
        comp.initNewEmployee();
        expect(comp.employees).not.toBeNull();
        expect(comp.employees.length).toBe(5);
    });

    it('addEmployee(employee): 5 employess', ()=>{
        var employee = {
            id: 1,
            name: 'name',
            surname: 'surname',
            position: '',
            date: 'date'
        };
        comp.addEmployee(employee);
        expect(comp.employees).not.toBeNull();
        expect(comp.employees.length).toBe(5);
    });
    
    it('updateEmployee(employee): 4 employess', ()=>{
        var employee = {
            id: 1,
            name: 'name',
            surname: 'surname',
            position: '',
            date: 'date'
        };
        comp.updateEmployee(employee);
        expect(comp.employees).not.toBeNull();
        expect(comp.employees.length).toBe(4);
    });
    
    it('delete(1): 3 employess', ()=>{
        comp.deleteEmployee(1);
        expect(comp.employees).not.toBeNull();
        expect(comp.employees.length).toBe(3);
    });

    it('validated employee', ()=>{
        var employee = {
            id: 1,
            name: 'name',
            surname: 'surname',
            position: '',
            date: 'date'
        };
        var ok = comp.validateEmployee(employee);
        expect(ok).toBeTruthy();
    });

    it('NOT validated employee', ()=>{
        var employee = {
            id: 1,
            name: 'name',
            surname: 'surname',
            position: '',
            date: ''
        };
        var ok = comp.validateEmployee(employee);
        expect(ok).toBeFalsy();
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should have expected <h1> text', () => {
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.nativeElement.innerText).toMatch(/employee/i, '<h1> should say something about employee');
    });
});