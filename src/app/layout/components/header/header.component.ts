import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { setInterval } from 'timers';
import { CatType } from 'src/app/model/cat-type';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,AfterViewInit {
  //-----old-----
// islogedin:boolean=false;
// showDropdown: boolean = false;
// loginAleart:boolean=true;
// toastFlag:boolean=true;
// searchValue:string="";
// numberOfCartProducts:number;
// @Input() numberOfCartProducts:number;


//---  new branch test -------------------
searchValue:string=""
showDropdown: boolean = false;
categories:CatType[];
@ViewChild('targetDiv') targetDiv!: ElementRef;
hideLogo = false;
  constructor(private authService:AuthService,private fb:FormBuilder,private cartService:CartService,private apiService:ApiService,private cdRef: ChangeDetectorRef) {
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const topOffset = this.targetDiv.nativeElement.getBoundingClientRect().top;
    const shouldHide = topOffset <= -100;
    if (this.hideLogo !== shouldHide) {
      this.hideLogo = shouldHide;
      this.cdRef.detectChanges(); // ✅ resolves the ExpressionChanged error
    }
  }
  ngAfterViewInit() {
    // Optional: check initial position
    this.onWindowScroll();
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
prodofcats(categoryId:number):ProdType[] | null {
this.apiService.getProductByCatId(2,0,categoryId).subscribe({
  next:(value)=>{
    return value

  }
})
  return null
}
}
