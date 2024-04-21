import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showOtpPopup:boolean = false
  loading: boolean = false;
  otpForm: FormGroup;
  userID:string = ''
  registeredEmail:string = ''
  @ViewChildren('otpInput') otpInputs: QueryList<ElementRef>;

  constructor(private formBuilder: FormBuilder,private http:HttpClient, private router:Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  });  
    this.otpForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });
    }  
    ngAfterViewInit() {
      this.setFocus(0);
    }  
    setFocus(index: number) {
      if (this.otpInputs && this.otpInputs.toArray().length > index) {
        const inputElement = this.otpInputs.toArray()[index].nativeElement;
        if (inputElement.value !== '') {
          // Clear input value
          inputElement.value = '';
        }
        inputElement.focus();
      }
    }  
   onOtpInputChange(event, index: number) {
      const input = event.target as HTMLInputElement;
      const inputValue = input.value;
      const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters  
      // If the sanitized value is a single digit between 0 and 9
      if (/^[0-9]$/.test(sanitizedValue)) {
        this.otpForm.get(`digit${index + 1}`).setValue(sanitizedValue); // Update form control value
        if (inputValue !== sanitizedValue) {
          // If the input value has been changed, update the view
          input.value = sanitizedValue;
        }
        if (inputValue.length === 1 && index < 5) {
          this.setFocus(index + 1); // Move focus to the next input
        }
      } else {
        // If the input value is not a single digit between 0 and 9, clear the value
        this.otpForm.get(`digit${index + 1}`).setValue(''); // Clear form control value
        input.value = ''; // Clear input value
      }
    }

    get rformcontrol() { return this.registerForm.controls; }  

    onLastInputKeydown(event: KeyboardEvent) {
      const input = event.target as HTMLInputElement;
      if (input.value.length >= 1 && event.key !== 'Backspace') {
        event.preventDefault();
      }
    }

    onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      const username = this.rformcontrol.username.value;
      const email = this.rformcontrol.email.value;
      const password = this.rformcontrol.password.value;

      this.http.post<any>('https://apicareercompass.azurewebsites.net/signup',{username,email,password}).subscribe({
        next : response=>{
          this.loading = false
          const user = response
          this.userID= user.data.userID
          this.registeredEmail = email
          this.registerForm.reset()
          this.showOtpPopup = true
        },
        error : error => {
          this.loading = false
          if (error.status === 409) {
            this.errorMessage = 'User already exists';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid request';
          } else {
            this.errorMessage = 'Server error';
          }
          setTimeout(()=>{
              this.errorMessage = ''
            },3000)
          }
        })
      }
    }

    onOtpSubmit() {
      if (this.otpForm.valid) {
        this.loading = true
        // Concatenate individual digits into a single 6-digit number
        const otpNumber = Object.values(this.otpForm.value).join('');
        const params = {
          userID: this.userID,
          otp: otpNumber
        };
        this.http.put('https://apicareercompass.azurewebsites.net/signup/callback',null,{params:params}).subscribe({
          next: () => {
            this.loading = false
            this.successMessage = 'You have been successfully registered'
            setTimeout(()=>{
              this.successMessage = '',
              this.router.navigate(['/signin'])
            },3000)
          },
          error : (error) => {
            this.loading = false
            if (error.status === 409) {
              this.errorMessage = 'User already exists';
            } else if (error.status === 400) {
              this.errorMessage = 'Invalid request';
            } else {
              this.errorMessage = 'Server error';
            }
            setTimeout(()=>{
              this.errorMessage = ''
            },3000)
          }
        })
      } else {
        // Handle invalid form submission
        console.log('Form is invalid');
      }
    }
}
