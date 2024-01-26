import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SkillsAreaComponent } from './skills-area/skills-area.component';
import { SkillsItemComponent } from './skills-area/skills-item/skills-item.component';
import { RolesAreaComponent } from './roles-area/roles-area.component';
import { RolesItemComponent } from './roles-area/roles-item/roles-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SkillsAreaComponent,
    SkillsItemComponent,
    RolesAreaComponent,
    RolesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
