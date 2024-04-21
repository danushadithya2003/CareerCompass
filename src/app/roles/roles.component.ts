import { Component } from '@angular/core';
import { RolesService } from '../Services/roles.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  loading:boolean = false
  roles: any[] = [];
  allroles : any[] = []
  filter:boolean = false
  searchForm: FormGroup;
  constructor(private rolesService:RolesService, private router:Router,private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });
  }

  ngOnInit(){
    this.loading = true
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data.data;
      console.log(this.roles);
      this.allroles = this.roles
      this.loading = false
    });
  }

  navigateToRole(roleId: number) {
    this.router.navigate(['/role',roleId]);
  }

  onSubmit() {
    const role= this.searchForm.get('searchInput').value;
    console.log('Search Value:', role);
    this.rolesService.searchRole(role).subscribe(data => {
      this.roles = data.data;
      this.filter=true
    })
  }

  resetRoles(){
    this.searchForm.reset();
    this.roles = this.allroles
    this.filter = false
  }
}
