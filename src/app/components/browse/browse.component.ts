import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit  {
catProducts:ProdType[];
pagesNum:number[];
pageIndex:number;
catId:number;
isLastPage:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService) {
    this.catProducts=[]
    this.pagesNum=[]
    this.pageIndex=0;
    this.catId=0;
   }

  ngOnInit(): void {
    this.getCatigoryFromUrl();
console.log('ng on init')
  }

getCatigoryFromUrl(){
  this.activatedRoute.paramMap.subscribe({
    next:(value)=>{
       this.catId = Number(value.get('catId'))
//reintialize page index and pageNum array  when catigory change
       this.pageIndex=0;
       this.pagesNum=[];
       this.pagesNum.push(this.pageIndex)
       this.isLastPage=false;
      this.getCatigoryProducts(this.catId,this.pageIndex)

    }
  })
}
getCatigoryProducts(catId:number,offset:number){
this.apiService.getProductByCatId(10,offset,catId).subscribe({
  next:(result)=>{
this.catProducts=result;
console.log(this.catProducts)
if(result.length<10){
  this.isLastPage=true
}
  }
})
}
nextPage(){
  if(this.isLastPage){

  }else{
  this.pageIndex++
  if(this.pageIndex>Math.max(...this.pagesNum) ){this.pagesNum.push(this.pageIndex)}
  this.goPage(this.pageIndex)
  }
}
prevPage(){
  this.pageIndex--
  this.pageIndex= this.pageIndex<0 ?  0 : this.pageIndex;
  this.goPage(this.pageIndex)

}
goPage(page:number){
  this.pageIndex=page;
this.getCatigoryProducts(this.catId,this.pageIndex)
}
}
