import { Component } from '@angular/core';
import { RolesService } from '../Services/roles.service';
import { Role } from '../Models/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  username:string = localStorage.getItem('username')
  prediction:string;
  role:Role
  imagePath:string
  constructor(private rolesService:RolesService,private router:Router) {

  }

  ngOnInit(){
    this.prediction = localStorage.getItem('prediction')
    this.rolesService.searchRole(this.prediction).subscribe((data)=>{
      this.role = data.data[0]
    })
  }

  navigateToRole(roleId:string) {
    this.router.navigate(['/roles',roleId]);
  }
}
