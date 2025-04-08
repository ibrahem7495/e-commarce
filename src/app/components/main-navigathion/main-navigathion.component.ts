import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CatType } from 'src/app/model/cat-type';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-main-navigathion',
  templateUrl: './main-navigathion.component.html',
  styleUrls: ['./main-navigathion.component.css']
})
export class MainNavigathionComponent implements OnInit {
products:ProdType[][];
prodWindow:ProdType[][];
windoowLimit:number=1;
userIndex:number[]=[];
cats:CatType[];
  constructor(private apiService:ApiService) {
this.products=[];
this.prodWindow=[]
this.cats=[]
  }

  ngOnInit(): void {
    this.setCarouselWindowLimit();
    this.getAllProductsSrtedById();
  }
  getAllProductsSrtedById(){
    this.getCats();
  }
  getAllProduct(){
    if(this.cats){
      // for loop
      this.cats.forEach((cat ,i) => {
 console.log('getAllProduct for')
    this.apiService.getProductByCatId(20,0,cat.id).subscribe({
      next:(valueArray)=>{
        this.products[i]=valueArray
        console.log('this.products',this.products)

        //to avoid called multiple times and not placed out side the loop becase of the observable will leave the loop and contane the code until next value comes from api so when  the update function called ther is no data to updated
        if(i+1==this.cats?.length){
          this.updateCarousl();
        }
      }
    })
      });


  }
}

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

this.cats?.forEach((cat,i) => {
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

  getCats(){
    this.apiService.getAllCategory().subscribe({
      next:(allCat)=>{
        this.cats=allCat;
        this.setIndex();
        this.getAllProduct();
      }
    })
  }
  setIndex(){
    this.cats?.forEach(() => {
    this.userIndex.push(0)
    });

  }
  setCarouselWindowLimit(){
     const windowWidth=window.innerWidth
     this.windoowLimit=3;
    if (windowWidth > 1024) {
      this.windoowLimit = 3;
    } else if (windowWidth > 768) {
      this.windoowLimit = 2;
    } else {
      this.windoowLimit = 1;
    }
}
}
