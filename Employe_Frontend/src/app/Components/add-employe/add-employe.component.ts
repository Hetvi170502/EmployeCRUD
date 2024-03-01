import { employe } from 'src/app/Models/employe.model';
import { designation } from './../../Models/designation.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hobby } from 'src/app/Models/hobby.model';
import { EmployeService } from 'src/app/Services/employe.service';
import { employeHobby } from 'src/app/Models/employeHobby.model';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  addData : FormGroup;
  designation : designation[] = [];
  hobby :Hobby[]= [];
  emphobby : employeHobby[] = [];



  get employeName() {return this.addData.get('employeName');}
  get gender() {return this.addData.get('Gender');}
  get designationId() {return this.addData.get('designationId');}
  get employeHobbies() {return this.addData.get('employeHobbies');}
  get email() {return this.addData.get('email');}
  get phoneNumber() {return this.addData.get('phoneNumber');}

  constructor(private employe : EmployeService , private formBuilder : FormBuilder,
                private route : Router )
  {
    this.addData = this.formBuilder.group({
      employeName : ['' , Validators.required],
      gender : ['' , Validators.required],
      designationId : ['' , Validators.required],
      email : ['' , [Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phoneNumber : ['' , [Validators.required ,Validators.pattern('^[0-9]{10}$')]],
      employeHobbies : new FormArray([])

    });
  }
  ngOnInit(): void {
    this.GetDesignation();
    this.GetHobby();

  }

  onCheckChange(event : any){
    const array : FormArray = this.addData.get('employeHobbies') as FormArray;
    if(event.target.checked)
    {
      array.push(new FormControl(event.target.value));
    }
    else{
      let i : number = 0;
      array.controls.forEach((ctrl : any ) => {
        if(ctrl.value == event.target.value){
          array.removeAt(i);
          return;
        }
        i++;
      })
    }
  }

  addEmploye()
  {
    if(this.addData.valid)
    {
      this.employe.Add(this.addData.value)
      .subscribe({
        next : (data) =>
        {
          this.route.navigate(['list-employe']);
        },
        error : (error) =>
        {
          console.error(error);
        }
      })
    }
    else
    {
      console.warn('Getting Error');
    }
  }

  GetDesignation()
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

  back()
  {
    this.route.navigate(['list-employe']);
  }

  GetHobby()
  {
    this.employe.GetHobby()
    .subscribe({
      next : (data) =>
      {
        this.hobby = data;
        console.log(this.hobby);
      },
      error : (error) =>
      {
        console.error(error);
      }
    })
  }
}
