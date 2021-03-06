import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import {AppRoutingModule} from "./app-routing.module";
import { NoAccessComponent } from './no-access/no-access.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ChartComponent } from './chart/chart.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    TodoOverviewComponent,
    AddEditComponent,
    NoAccessComponent,
    ChartComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
