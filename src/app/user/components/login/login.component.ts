import { CartService } from './../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm :FormGroup;
returnURL:string ='/home'
  constructor(private fb :FormBuilder,private authService:AuthService,private activatedRoute:ActivatedRoute,private router:Router) {
this.loginForm=fb.group({
  email :["",[Validators.required,Validators.email]],
  password:["",[Validators.required,Validators.minLength(6)]],
})
  }
get email(){
  return this.loginForm.get('email')
}
get password(){
  return this.loginForm.get('password')
}
onSubmit(){
  // console.log("value ",this.email?.value,this.password?.value);
this.authService.login(this.email?.value,this.password?.value,this.returnURL);

}
  ngOnInit(): void {
    this.returnURL=this.activatedRoute.snapshot.queryParams['returnURL']
    console.log('returnURL',this.returnURL)
  }

}
