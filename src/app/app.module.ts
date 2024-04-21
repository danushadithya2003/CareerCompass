import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HeaderComponent } from './header/header.component';
import { RolesComponent } from './roles/roles.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './Authentication/auth.service';
import { AssessmentComponent } from './assessment/assessment.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { WebService } from './Services/web.service';
import { SkillsService } from './Services/skills.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ResultsComponent } from './results/results.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RolesComponent,
    SkillsComponent,
    HomeComponent,
    AssessmentComponent,
    RoleDetailComponent,
    SkillDetailComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule,
  ],
  providers: [AuthService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
