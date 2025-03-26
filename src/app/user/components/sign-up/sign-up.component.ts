import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private fb: FormBuilder ,private apiService:ApiService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  // Type-safe getter for form controls
  get f() {
    return this.signUpForm.controls;
  }

onSubmit(){
  console.log(JSON.stringify( this.signUpForm.value))
this.apiService.addNewUser(this.signUpForm.value).subscribe({
  next:(res)=>{console.log("added user ",res)},
  error:(err)=>{console.error("errrrr: ",err)}
})
}
  ngOnInit(): void {
  }

}
