import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'skills',
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
    component: AssessmentComponent,
  },
  { 
    path: 'role/:roleId', 
    component: RoleDetailComponent
   },
   {
    path: 'skill/:skillId',
    component: SkillDetailComponent
   },
   {
    path: 'results',
    component: ResultsComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
