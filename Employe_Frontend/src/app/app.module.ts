import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeComponent } from './Components/add-employe/add-employe.component';
import { EditEmployeComponent } from './Components/edit-employe/edit-employe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEmployeComponent } from './Components/list-employe/list-employe.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeComponent,
    EditEmployeComponent,
    ListEmployeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
