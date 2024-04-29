import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { ResultsComponent } from './results/results.component';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'roles',
    canActivate:[AuthGuard],
    component: RolesComponent,
  },
  {
    path: 'skills',
    canActivate:[AuthGuard],
    component: SkillsComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'skilltest',
    canActivate:[AuthGuard],
    component: AssessmentComponent,
  },
  { 
    path: 'roles/:roleId',
    canActivate:[AuthGuard], 
    component: RoleDetailComponent
   },
   {
    path: 'skills/:skillId',
    canActivate:[AuthGuard],
    component: SkillDetailComponent
   },
   {
    path: 'results',
    canActivate:[AuthGuard],
    component: ResultsComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
