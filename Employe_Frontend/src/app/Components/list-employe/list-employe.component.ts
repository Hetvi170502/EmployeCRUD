import { Hobby } from 'src/app/Models/hobby.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { designation } from 'src/app/Models/designation.model';
import { employe } from 'src/app/Models/employe.model';
import { EmployeService } from 'src/app/Services/employe.service';
import { employeHobby } from 'src/app/Models/employeHobby.model';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent implements OnInit {

  employes : employe[] = [];
  designation : designation[] = [];
  hobby : Hobby[] = [];
  empHobby : employeHobby[] = [];



  constructor(private employe : EmployeService , private route : Router)
  {

  }

  ngOnInit(): void {
    this.listEmp();
   //this.FetchDesignation();
    //this.FetchHobbies();
  }

  listEmp()
  {
    this.employe.GetAll()
    .subscribe({
      next : (data : employe[]) =>
      {
        this.employes = data;
      },
      error : (error) =>
      {
        console.error();
      }
    });
  }

  EmpHobby()
  {
    this.employe.GetEmpHobby()
    .subscribe({
      next : (data) =>
      {
        this.empHobby = data;
      },
      error : (error) =>
      {
        console.error();
      }
    });
  }
  deleteEmp(id : number)
  {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if(confirmDelete)
    {
      this.employe.Delete(id)
      .subscribe
      ({
        next : (data) =>
        {
          this.employes = data;
          this.listEmp();
        },
        error : (error) =>
        {
          console.log('Error',error);
        }
      })
    }
  }

  FetchDesignation()
  {
    this.employe.GetDesignation()
    .subscribe({
      next : (data) =>
      {
        this.designation = data;
      },
      error : (error) =>
      {
        console.error(error);
      }
    })
  }
  getDesignationName(designationId: number): string {
    const designation = this.designation.find(d => d.id === designationId);
    return designation ? designation.designationName : '';
  }

  FetchHobbies()
  {
    this.employe.GetHobby()
    .subscribe({
      next : (data) =>
      {
        this.hobby = data;
      },
      error : (error) =>
      {
        console.error(error);
      }
    })
  }

  getHobbies(hobbyId : number) : string
  {
    const hobby = this.hobby.find(h =>h.id === hobbyId);
    return hobby ? hobby.hobbyName : '';
  }


}
