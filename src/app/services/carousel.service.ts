import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ProdType } from '../model/prod-type';
import { CatType } from '../model/cat-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
// electronicProds?:ProdType[];
carouselPage:number[];
carouselLimit:number;
twoDimArray:ProdType[][]

constructor(private apiService:ApiService) {
this.carouselLimit=3;
this.twoDimArray=[]
this.carouselPage=[]
  }
  prevCarouslPage(catId:number,index:number){
    console.log('prevCarouslPage')
        //if statmint  to avoid multi decrimintation in carouselPage value when user click several times on previous page button
    if(this.carouselPage[index]>=this.carouselLimit-1){
  // this.carouselPage[index]-=this.carouselLimit;
  console.log('this.carouselPage prev[index]',this.carouselPage[index])
  this.carouselPage[index]-=1;
  this.updateCarousl(catId,index,'prev');
  }
  }
  nextCarouslPage(catId:number,index:number){
    // this.carouselPage[index]=this.carouselPage[index]+this.carouselLimit;
    console.log('next[index]',this.carouselPage[index])
    this.carouselPage[index]+=1;
    this.updateCarousl(catId,index,'next');
    }
    pushNextValue(nextValue:ProdType,index:number){
      //prepare twoDimArray to git the nexxt value without losing any value otherwise the first one
    for (let i = 0; i < this.twoDimArray[index].length-1; i++) {
      // this.twoDimArray[index][i]=this.twoDimArray[index][i+1]
      this.twoDimArray[index][i]=this.twoDimArray[index][i+1]

        }
        this.twoDimArray[index][this.carouselLimit-1]=nextValue;
    }
    pushPrevValue(prevValue:ProdType,index:number){
      console.log('pushPrevValue')

      //prepare twoDimArray to git the nexxt value without losing any value otherwise the first one
      for (let i = this.twoDimArray[index].length-1; i >= 0; i--) {
        this.twoDimArray[index][i]=this.twoDimArray[index][i-1]
        console.log( 'i = ',i)
        console.log('index',index)
          }
          this.twoDimArray[index][0]=prevValue;

      }

  updateCarousl(catId: number,index:number,state:string){
    console.log('updateCarousl')

    this.apiService.getProductByCatId(1,this.carouselPage[index],catId).subscribe({
  next:(givenValue)=>{
    if(givenValue.length>0){
    // console.log('this.twoDimArray[index] befor : ',this.twoDimArray[index],index)
  if (state==='next') {this.pushNextValue(givenValue[0],index)}
  if (state==='prev') {this.pushPrevValue(givenValue[0],index)}
    // console.log('this.twoDimArray[index] after : ',this.twoDimArray[index],index)
    }
    else{
       //to avoid multi addition in carouselPage value when user click several times on next page button
      //  this.carouselPage[index]-=this.carouselLimit;
      this.carouselPage[index]-=1;
    }
  }
    })
  }

}
