import { CarouselService } from './../../services/carousel.service';
import { ProdType } from 'src/app/model/prod-type';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CatType } from 'src/app/model/cat-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:CatType[];
  constructor(private apiService:ApiService){
    this.categories=[]
  }
  ngOnInit(): void {
    this.getAllCatigories();
  }
  getAllCatigories(){
    this.apiService.getAllCategory().subscribe({
      next:(allCatigories)=>{
        this.categories=allCatigories;
      }
    })
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
