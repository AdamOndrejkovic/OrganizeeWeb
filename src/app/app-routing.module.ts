import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AddEditComponent} from "./add-edit/add-edit.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NoAccessComponent} from "./no-access/no-access.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  { path: 'home', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'error', component: NoAccessComponent },
  { path: 'admin/add', component: AddEditComponent,canActivate:[AuthGuard]},
  { path: 'admin/edit/:id', component: AddEditComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'home' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
