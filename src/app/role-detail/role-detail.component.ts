import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../Services/roles.service';
import { Role } from '../Models/role.model';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrl: './role-detail.component.css'
})
export class RoleDetailComponent {
  constructor(private route: ActivatedRoute, private rolesService:RolesService,
    private router:Router
  ) {}

  loading:boolean = false
  role:Role
  ngOnInit(){
    this.loading = true
    const roleId = this.route.snapshot.paramMap.get('roleId');
    this.rolesService.getRole(roleId).subscribe((data)=>{
      this.role = data.data;
      console.log(this.role);
      this.loading = false
    })
  }

  navigateToSkill(skillId:number) {
    this.router.navigate(['/skill',skillId]);
  }
}
