import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router:Router, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  });
  }

  get formcontrol() { return this.loginForm.controls; }  

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      const email = this.formcontrol.email.value;
      const password = this.formcontrol.password.value;

      this.http.post<any>('https://apicareercompass.azurewebsites.net/signin',{
        email : email,
        password : password
      }).subscribe({
        next: (response) => {
          this.loading = false
          const userdata = response.data
          this.successMessage = 'Successfully Signed In'
          setTimeout(()=>{
            this.successMessage = 'You will be redirected soon'
          },1500)
          setTimeout(()=>{
            this.successMessage = ''
            this.authService.setlogin(userdata.username,userdata.email,userdata.token,userdata.role)
            this.router.navigate(['/'])
          },3000)
        },
        error: (error) => {
          this.loading = false
          if (error.status === 409) {
            this.errorMessage = 'User already exists';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid request';
          } else {
            this.errorMessage = 'Invalid Credentials';
          }
          setTimeout(()=>{
              this.errorMessage = ''
            },3000)
        }
      })

    }
  }
}
