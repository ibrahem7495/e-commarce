import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
numberOfCartProducts:number;
// @Input() numberOfCartProducts:number;

  constructor(private authService:AuthService,private fb:FormBuilder,private cartService:CartService) {
    this.numberOfCartProducts=0;
   }

  ngOnInit(): void {
    this.cartService.syncItems()
    this.cartService.cartLength$.subscribe({
      next:(value)=>{this.numberOfCartProducts=value}
    })
    this.islogedin=this.authService.isAuthenticated();
    setTimeout(() => {
        this.toastFlag=false; // Hide toast
    }, 5000);  // Hide after 5 seconds
  }



  logout(){
    this.authService.logout();
  }


}
