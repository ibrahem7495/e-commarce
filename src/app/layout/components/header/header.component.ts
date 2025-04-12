import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { setInterval } from 'timers';
import { CatType } from 'src/app/model/cat-type';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //-----old-----
  // islogedin:boolean=false;
  // showDropdown: boolean = false;
  // loginAleart:boolean=true;
  // toastFlag:boolean=true;
  // searchValue:string="";
  // numberOfCartProducts:number;
  // @Input() numberOfCartProducts:number;

  //---  new branch test -------------------
  searchValue: string = '';
  showDropdown: boolean = false;
  categories: CatType[];
  navWelcome: ProdType [];
  classOnScroll = false;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) {
    // this.numberOfCartProducts=0;

    //---  new branch test -------------------
    this.categories = [];
    this.navWelcome = [];

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

  @HostListener('window:scroll') onScroll() {
    if (window.scrollY > 50) {
this.classOnScroll=true;
    } else if(window.scrollY < 48) {
      this.classOnScroll=false;

    }
  }


  logout() {
    this.authService.logout();
  }
  getAllCategories() {
    this.apiService.getAllCategory().subscribe({
      next: (value) => {
        this.categories = value;
        console.log('this.categories', this.categories);
      },
    });
  }
  mainTwoProdOfCats(id:number):ProdType[] | null {
      this.apiService.getProductByCatId(2, 0, id).subscribe({
        next: (value) => {
          this.navWelcome = value;
          console.log('this.navWelcome',this.navWelcome)
          return value
        },
      });
      return null
  }
}
