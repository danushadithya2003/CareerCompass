import { Component } from '@angular/core';
import { SkillsService } from '../Services/skills.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  loading:boolean=false
  skills: any[] = [];
  allskills:any[] = [];
  filter:boolean = false
  searchForm: FormGroup;
  constructor(private skillsService:SkillsService, private router:Router,private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });
  }

  ngOnInit(){
    this.loading = true
    this.skillsService.getSkills().subscribe(data => {
      this.skills = data.data;
      console.log(this.skills);
      this.allskills = this.skills;
      this.loading = false
    });
  }

  navigateToSkill(skillId:number) {
    this.router.navigate(['/skills',skillId]);
  }

  onSubmit() {
    const skill= this.searchForm.get('searchInput').value;
    console.log('Search Value:', skill);
    this.skillsService.searchSkill(skill).subscribe(data => {
      this.skills = data.data;
      this.filter = true
    })
  }

  resetSkills(){
    this.searchForm.reset();
    this.skills = this.allskills
    this.filter = false
  }
}
