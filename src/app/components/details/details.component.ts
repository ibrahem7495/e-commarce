import { CartService } from './../../services/cart.service';
import { CarouselService } from './../../services/carousel.service';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
product:ProdType;
relatedProd?:ProdType[];
relatedProdWindow?:ProdType[];
windoowLimit:number=1;
index:number=0;
  constructor(private activatedRoute:ActivatedRoute,private apiService:ApiService, private carouselService:CarouselService,private cartService:CartService ) {

    this.setCarouselWindowLimit()
      this.product=  {
      id: 6,
      title: "Classic Comfort Fit Joggers",
      slug: "classic-comfort-fit-joggers",
      price: 25,
      description: "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.",
      category: {
          id: 1,
          name: "Clothes",
          slug: "clothes",
          image: "https://i.imgur.com/QkIa5tT.jpeg",

      },
      images: [
          "https://i.imgur.com/ZKGofuB.jpeg",
          "https://i.imgur.com/GJi73H0.jpeg",
          "https://i.imgur.com/633Fqrz.jpeg"
      ],

  }
  }

  ngOnInit(): void {
this.getIdFromUrl();
  }
getIdFromUrl(){
  this.activatedRoute.paramMap.subscribe({
    next:(urlData)=>{
const prodId=Number(urlData.get('prodIdFordetalis'))
this.getProductDetalis(prodId);
this.getRelated(prodId);
    }
  })
}
getProductDetalis(id:number){
  this.apiService.getPrductById(id).subscribe({
    next:(detalisValue)=>{
this.product=detalisValue
console.log(this.product)
console.log('img',this.product.images)
    }
  })
}
getRelated(id:number){
this.apiService.getRelatedProducts(id).subscribe({
  next:(value)=>{
this.relatedProd=value;
this.updateCarousl();
  }
})
}


addToCart(prod:ProdType){
this.cartService.addToCart(prod)
}

 nextCarouslPage(){
  this.index+=1
  if (this.relatedProd) {
if (this.index>this.relatedProd.length-this.windoowLimit) {
this.index=this.relatedProd.length-this.windoowLimit
  }
  }

   this.updateCarousl();

   }
prevCarouslPage(){

  this.index-=1
if (this.index<0) {
this.index=0;
  }
   this.updateCarousl();

}


 updateCarousl(){
  this.relatedProdWindow=this.relatedProd?.slice(this.index,this.index+this.windoowLimit)
console.log("window",this.relatedProdWindow)
console.log("index",this.index)

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
