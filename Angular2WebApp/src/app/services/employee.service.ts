import{Injectable} from '@angular/core';
import{Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService{
    url ='http://ibillboard.com/api/positions';

    // Constructor with http.
    constructor(private http:Http){
        console.log('EmployeeService constructor');
    }

    // Get positions by given url.
    getPositions(): Observable<any> {
        console.log('EmployeeService.getPositions()');
        return this.http.get(this.url)
                        .map((res:Response)=>res.json());
    }

    // Get employees from sample object list.
    getEmployees(): any[] {
        return [
            {
                id: 1,
                name: 'Milan',
                surname: 'Novotny',
                position: 'full-stack developer',
                date: '1970-01-01'
            },
            {
                id: 2,
                name: 'Petr',
                surname: 'Pavek',
                position:'front-end developer',
                date: '1980-01-01'
            },
            {
                id: 3,
                name: 'Josef',
                surname: 'Toufar',
                position: 'sw admin',
                date: '1990-12-31'
            },
        ];
    }
}