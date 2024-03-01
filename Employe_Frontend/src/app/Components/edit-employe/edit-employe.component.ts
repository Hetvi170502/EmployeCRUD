import { employe } from 'src/app/Models/employe.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { designation } from 'src/app/Models/designation.model';
import { employeHobby } from 'src/app/Models/employeHobby.model';
import { Hobby } from 'src/app/Models/hobby.model';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.css']
})
export class EditEmployeComponent implements OnInit {

  id : number = 0;
  editData : FormGroup;
  designation : designation[] = [];
  hobby : Hobby[] = [];
  emphobby : employeHobby[] = [];
  selectedHobbies: number[] = [];


  get employeName() {return this.editData.get('employeName');}
  get gender() {return this.editData.get('Gender');}
  get designationId() {return this.editData.get('designationId');}
  get employeHobbies() {return this.editData.get('employeHobbies');}
  get email() {return this.editData.get('email');}
  get phoneNumber() {return this.editData.get('phoneNumber');}

  constructor(private employe : EmployeService , private formbuilder : FormBuilder,
                private router : Router  , private route : ActivatedRoute )
  {
    this.editData = this.formbuilder.group({
      employeName : ['' , Validators.required],
      gender : ['' , Validators.required],
      designationId : ['' , Validators.required],
      employeHobbies : new FormArray([]),
      email : ['' , [Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phoneNumber : ['' , [Validators.required ,Validators.pattern('^[0-9]{10}$')]],

    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) =>
    {
      const idParams:any =params.get('id');
      this.id = idParams;
      this.onLoad(this.id);
      this.GetDesignation();
      this.GetHobby();
      this.EmpHobby();
    })
  }

  onLoad(id : number)
  {
    this.employe.GetOne(id)
    .subscribe({
      next : (data) =>
      {


        this.selectedHobbies = data.employeHobbies.map((hobby: any) => hobby.hobbyId);
        this.editData.patchValue(data);
        const employeHobbiesArray = this.editData.get('employeHobbies') as FormArray;
        employeHobbiesArray.clear();
        data.employeHobbies.forEach((hobby: any) => {
          employeHobbiesArray.push(new FormControl(hobby.hobbyId));
        });
        console.log(data);
      },
      error : (error) =>
      {
        console.error(error);
      }
    })
  }

  isSelected(hobbyId: number): boolean {

    return this.selectedHobbies.includes(hobbyId);
  }


  onCheckChange(event: any): void {
    const array: FormArray = this.editData.get('employeHobbies') as FormArray;
    if (event.target.checked) {
      array.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      array.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          array.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  editEmploye()
  {
    if(this.editData.valid)
    {
      this.employe.Update( this.id , this.editData.value)
      .subscribe({
        next : (data) =>
        {
          this.router.navigate(['list-employe']);
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
    this.router.navigate(['list-employe']);
  }


  GetHobby()
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

  EmpHobby()
  {
    this.employe.GetEmpHobby()
    .subscribe({
      next : (data) =>
      {
        this.emphobby = data;
        console.log(this.hobby);
      },
      error : (error) =>
      {
        console.error(error);
      }
    })
  }

}
