import { CarouselService } from './../../services/carousel.service';
import { ProdType } from 'src/app/model/prod-type';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CatType } from 'src/app/model/cat-type';
// import { MainNavigathionComponent } from "../main-navigathion/main-navigathion.component";

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  // imports: [MainNavigathionComponent]
})
export class HomeComponent implements OnInit {
  categories:CatType[];
  products:ProdType[][];
prodWindow:ProdType[][];
windoowLimit:number=1;
userIndex:number[]=[];
newests:ProdType[];
  constructor(private apiService:ApiService){
    this.categories=[]
    this.products=[];
this.prodWindow=[]
this.newests=[]
  }
  ngOnInit(): void {
    this.getAllCatigories();
    this.apiService.getAllCarts().subscribe({
      next:(value)=>{
        console.log('cart ::: ',value)
      }
    })
    this.getnewests();
  }
  getAllCatigories(){
    this.apiService.getAllCategory().subscribe({
      next:(allCatigories)=>{
        this.categories=allCatigories;
      }
    })
  }
  currentIndex = 0;
  prevIndex=0;
  next() {
    this.currentIndex = (this.currentIndex + 1) % 3;
    this.prevIndex = (this.currentIndex - 1) % 3;
    if(this.prevIndex<0){this.prevIndex=2}
    console.log(this.currentIndex,this.prevIndex)

    this.applyEffect();

  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + 3) % 3;
//     console.log(this.currentIndex)
//     this.prevIndex=( 3 - this.currentIndex )  ;
// console.log(this.currentIndex,this.prevIndex)
    this.applyEffect();

  }
  triggerEffect = false;

  applyEffect() {
    this.triggerEffect = false; // reset in case it's already true
    setTimeout(() => this.triggerEffect = true, 10); // force class re-add
  }

  // second carousel what's new

  nextCarouslPage(index:number){
    this.userIndex[index]+=1
    if (this.products) {
  if (this.userIndex[index]>this.products[index].length-this.windoowLimit) {
  this.userIndex[index]=this.products[index].length-this.windoowLimit
    }
    }

     this.updateCarousl(index);

     }
  prevCarouslPage(index:number){

    this.userIndex[index]-=1
  if (this.userIndex[index]<0) {
  this.userIndex[index]=0;
    }
     this.updateCarousl(index);

  }


   updateCarousl(index?:number){

this.newests?.forEach((newest,i) => {
   if(index==undefined){
      console.log("index==undefined")

this.prodWindow[i]=this.products[i]?.slice(0,this.windoowLimit)//0 is for initial value
   }else{
      this.prodWindow[index]=this.products[index]?.slice(this.userIndex[index],this.userIndex[index]+this.windoowLimit)
  console.log(" else",this.userIndex)
  console.log(" else",this.prodWindow[index])

}
})

}
getnewests(){
  this.apiService.getAllProduts(10,0).subscribe({
    next:(value)=>{
      this.newests=value;
    }
  })
}
setCarouselWindowLimit(){
  const windowWidth=window.innerWidth
  this.windoowLimit=4;
 if (windowWidth > 1024) {
   this.windoowLimit = 4;
 } else if (windowWidth > 768) {
   this.windoowLimit = 3;
 } else {
   this.windoowLimit = 1;
 }
}
}

// export class HomeComponent implements OnInit {
// electronicProds?:ProdType[];
// // carouselPage:number[];
// // carouselLimit:number;
// catigories:CatType[];
// twoDimArray:ProdType[][]

//   constructor(private apiService:ApiService, private carouselService:CarouselService) {
// // this.carouselLimit=3;
//     this.catigories=[];
// this.twoDimArray=[]
// // this.carouselPage=[]
//    }

//   ngOnInit(): void {

//     this.getAllCat();

//   }
//   getAllproduct(){
//     console.log('alll')

//     for (let index = 0; index < this.catigories.length; index++) {
//       console.log('for')
//       //value 1 becaus of this function is runing only  in intial value
//     this.apiService.getProductByCatId(this.carouselService.carouselLimit,1,index+1).subscribe({
//       next:(value)=>{
// this.carouselService.twoDimArray?.push(value);
// this.carouselService.carouselPage.push(1);
//       }
//     })
//     }
//     this.twoDimArray=this.carouselService.twoDimArray;
// console.log('this.twoDimArray',this.twoDimArray)
//   }

// prevCarouslPage(catId:number,index:number){
//  this.carouselService.prevCarouslPage(catId,index);
//  this.twoDimArray=this.carouselService.twoDimArray;
// }
// nextCarouslPage(catId:number,index:number){
//  this.carouselService.nextCarouslPage(catId,index)
//  this.twoDimArray=this.carouselService.twoDimArray;

//   }
//   pushNextValue(nextValue:ProdType,index:number){
//  this.carouselService.pushNextValue(nextValue,index)

//   }
//   pushPrevValue(prevValue:ProdType,index:number){
// this.carouselService.pushPrevValue(prevValue,index)
//     }

// updateCarousl(catId: number,index:number,state:string){
//   this.carouselService.updateCarousl(catId,index,state)
// }
// getAllCat(){
//   this.apiService.getAllCategory().subscribe({
//     next:(allcatValue)=>{
// this.catigories=allcatValue;
// console.log(this.catigories)
// this.getAllproduct();

//     }
//   })
// }
// }
