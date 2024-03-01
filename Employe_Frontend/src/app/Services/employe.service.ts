import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employe } from '../Models/employe.model';
import { designation } from '../Models/designation.model';
import { Hobby } from '../Models/hobby.model';
import { employeHobby } from '../Models/employeHobby.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  Url = "https://localhost:7165/api/"

  constructor(private http : HttpClient)
  {

  }

  GetAll() : Observable<employe[]>
  {
    return this.http.get<employe[]>(this.Url + 'Employe');
  }

  GetOne(id:number) : Observable<any>
  {
    return this.http.get<any>(this.Url + 'Employe/' + id);
  }

  Add(addData : any) : Observable<employe>
  {
    return this.http.post<employe>(this.Url  + 'Employe' , addData);
  }

  Update(id:number,editData:any) : Observable<any>
  {
    return this.http.put<any>(this.Url + 'Employe/' + id , editData);
  }

  Delete(id:number) : Observable<any>
  {
    return this.http.delete<any>(this.Url + 'Employe/' + id);
  }

  GetDesignation() : Observable<designation[]>
  {
    return this.http.get<designation[]>(this.Url + 'Designation');
  }

  GetHobby() : Observable<Hobby[]>
  {
    return this.http.get<Hobby[]>(this.Url + 'Hobby');
  }

  GetEmpHobby() : Observable<employeHobby[]>
  {
    return this.http.get<employeHobby[]>(this.Url + 'Hobby/Employe');
  }
}
