import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeComponent } from './Components/list-employe/list-employe.component';
import { AddEmployeComponent } from './Components/add-employe/add-employe.component';
import { EditEmployeComponent } from './Components/edit-employe/edit-employe.component';

const routes: Routes = [

  {path:'list-employe' , component : ListEmployeComponent},
  {path:'employe/add' , component : AddEmployeComponent},
  {path:'employe/edit/:id' , component : EditEmployeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
