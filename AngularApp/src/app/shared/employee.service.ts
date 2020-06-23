import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,of, from } from 'rxjs';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[]; 
  readonly baseURL = 'http://localhost:3000/employees';
  constructor(private http : HttpClient) { }

  postEmployee(emp : Employee){
    return this.http.post(this.baseURL, emp);
  }
}
