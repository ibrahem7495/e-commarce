import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
islogedin:boolean=false;
showDropdown: boolean = false;
loginAleart:boolean=true;
toastFlag:boolean=true;
searchValue:string="";

  constructor(private authService:AuthService,private fb:FormBuilder) {

   }

  ngOnInit(): void {

    this.islogedin=this.authService.isAuthenticated();
    setTimeout(() => {
        this.toastFlag=false; // Hide toast
    }, 200);  // Hide after 2 seconds
  }



  logout(){
    this.authService.logout();
  }


}
