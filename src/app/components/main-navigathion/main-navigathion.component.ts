import { ApiService } from './../../services/api.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { CatType } from 'src/app/model/cat-type';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-main-navigathion',
  templateUrl: './main-navigathion.component.html',
  styleUrls: ['./main-navigathion.component.css']
})
export class MainNavigathionComponent implements OnInit {
products:ProdType[];
// prodWindow:ProdType[];
windowLimit:number=3;
carouselWindow:number[]
userIndex:number=0;
categories:CatType[];
  constructor(private apiService:ApiService) {
this.products=[];
// this.prodWindow=[]
this.carouselWindow=[0,1,2]
this.categories=[]
  }

  ngOnInit(): void {
    this.setCarouselWindowLimit();
    this.getAllProduct();
    this.getAllCategories();

  }
  @HostListener('window:resize')
  onWindowResize() {
    this.setCarouselWindowLimit();
  }
  getAllProduct(){
    this.apiService.getAllProduts(10,10).subscribe({
      next:(value)=>{
        this.products =value;
        // console.log('this.prodWindow',this.prodWindow)
      }
    })
}
getAllCategories(){
  this.apiService.getAllCategory().subscribe({
    next:(value)=>{
      this.categories =value;
      // console.log('this.prodWindow',this.prodWindow)
    }
  })
}
  nextCarouslPage(){
    this.userIndex +=1
    if (this.products) {
  if (this.userIndex>this.products.length-this.windowLimit) {
  this.userIndex=this.products.length-this.windowLimit
    }
    }


     }
  prevCarouslPage(){

    this.userIndex-=1
  if (this.userIndex<0) {
  this.userIndex=0;
    }

  }






  setCarouselWindowLimit(){

    //  const windowWidth=window.innerWidth
    //  this.windowLimit=3;
    // if (windowWidth > 1024) {
    //   this.windowLimit = 3;
    // } else if (windowWidth > 768) {
    //   this.windowLimit = 2;
    // } else {
    //   this.windowLimit = 1;
    // }
      const width = window.innerWidth;
    this.windowLimit = width >= 992 ? 3 : width >= 576 ? 2 : 1;

}
getSteppedIndices(): number[] {
  const indices = [];
  for (let i = 0; i < this.products.length; i += this.windowLimit) {
    indices.push(i);
  }
  return indices;
}
 isEven = (num: number): boolean => num % 2 === 0
}
