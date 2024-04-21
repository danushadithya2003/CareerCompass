import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent {

  expertiseForm: FormGroup;
  skillsLabels = 
  {
    "rate_webDev": "Web Development",
    "rate_infraAutomation": "Infrastructure Automation",
    "rate_mlAlgo": "Machine Learning",
    "rate_uiux": "UI/UX",
    "rate_blockchain": "Blockchain",
    "rate_appDev": "App Development",
    "rate_cloud": "Cloud",
    "rate_testing": "Testing",
    "rate_dataAnalytics": "Data Analytics",
    "rate_embedded": "Embedded Systems",
    "rate_ai": "Artificial Intelligence",
    "rate_cyber": "Cyber Security",
    "rate_arvr": "ARVR",
    "rate_compArch": "Computer Architecture",
    "rate_network": "Networks",
    "rate_projectMan": "Project Management",
    "rate_game": "Game Development"
  }
// Mapping object for form labels to API post body keys
skills = [
  "rate_webDev",
        "rate_infraAutomation",
        "rate_mlAlgo",
        "rate_uiux",
        "rate_blockchain",
        "rate_appDev",
        "rate_cloud",
        "rate_testing",
        "rate_dataAnalytics",
        "rate_embedded",
        "rate_ai",
        "rate_cyber",
        "rate_arvr",
        "rate_compArch",
        "rate_network",
        "rate_projectMan",
        "rate_game"
]

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    const skillControls = {};
    this.skills.forEach(skill => {
      skillControls[skill.toLowerCase()] = [1, Validators.required];
    });

    this.expertiseForm = this.formBuilder.group(skillControls);
  }

  setValue(skill: string, value: number) {
    this.expertiseForm.get(skill)?.setValue(value);
  }

  onSubmit() {
    if (this.expertiseForm.valid) {
      let testans = this.expertiseForm.value
      let usertoken = localStorage.getItem('token')
      this.http.post<any>(`https://apicareercompass.azurewebsites.net//predict?userID=<${usertoken}`,testans).subscribe((data)=>{
        let predictedRole = data.data.prediction;
        localStorage.setItem('prediction',predictedRole)
        this.router.navigate(['/results'])
      })
    } else {
      alert('Please fill in all fields with valid values.');
    }
  }
}
