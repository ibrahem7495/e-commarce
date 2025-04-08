import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { setInterval } from 'timers';
import { CatType } from 'src/app/model/cat-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  //-----old-----
// islogedin:boolean=false;
// showDropdown: boolean = false;
// loginAleart:boolean=true;
// toastFlag:boolean=true;
// searchValue:string="";
// numberOfCartProducts:number;
// @Input() numberOfCartProducts:number;


//---  new branch test -------------------
showDropdown: boolean = false;
categories:CatType[];

  constructor(private authService:AuthService,private fb:FormBuilder,private cartService:CartService,private apiService:ApiService) {
    // this.numberOfCartProducts=0;


    //---  new branch test -------------------
this.categories=[];
   }

  ngOnInit(): void {
//---  new branch test -------------------
    this.getAllCategories();



    // this.cartService.syncItems()
    // this.cartService.cartLength$.subscribe({
    //   next:(value)=>{this.numberOfCartProducts=value}
    // })
    // this.islogedin=this.authService.isAuthenticated();
    // setTimeout(() => {
    //     this.toastFlag=false; // Hide toast
    // }, 5000);  // Hide after 5 seconds
  }



  logout(){
    this.authService.logout();
  }
getAllCategories(){
this.apiService.getAllCategory().subscribe({
  next:(value)=>{
    this.categories=value;
console.log('this.categories',this.categories)
  }
})
}

}
