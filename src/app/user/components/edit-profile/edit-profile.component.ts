import { User } from './../../../model/user';
import { AuthService } from './../../../auth/services/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfile:FormGroup;
  userId:number=0;
  constructor(private fb:FormBuilder,private apiService : ApiService, private authService:AuthService) {
    this.editProfile=this.fb.group({
      name:["",Validators.required],
      email:["",[Validators.email,Validators.required]],
      password:["",[Validators.required,Validators.minLength(6)]],
      avatar:["",Validators.required]
    })
  }
  get f() {
    return this.editProfile.controls;
  }
  // get name(){
  //   return this.editProfile.get('name')
  // }
  // get email(){
  //   return this.editProfile.get('email')
  // }
  // get password(){
  //   return this.editProfile.get('password')
  // }
  // get avatar(){
  //   return this.editProfile.get('avatar')
  // }
  onSubmit(){
    this.apiService.editUser(this.userId,this.editProfile.value).subscribe({
      next:(editValue)=>{
        console.log("edit successfuly",editValue)
      }
    })
  }
  ngOnInit(): void {
this.authService.profile().subscribe({
  next:(response)=>{
    console.log(response)
    this.userId=response.id
    this.editProfile.patchValue(response);

  }
})


  }
  deleteprofile(){
    this.apiService.deleteUser(this.userId).subscribe({
      next:()=>{console.log('profile deleted sucsisfuly'),
        this.authService.logout();
      }

    })
  }
}
