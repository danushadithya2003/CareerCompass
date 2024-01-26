import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsAreaComponent } from './skills-area/skills-area.component';
import { RolesAreaComponent } from './roles-area/roles-area.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'skills', component: SkillsAreaComponent },
  { path: 'roles', component: RolesAreaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
