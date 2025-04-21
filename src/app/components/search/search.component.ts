import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdType } from 'src/app/model/prod-type';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searcheResult!:ProdType[];
onePageData:ProdType[];
pagesNum:number;
pagesNumArray:number[];
minPrice:number=-1;
maxPrice:number=-1;

pageIndex:number;
isLastPage:boolean=false;
slug:string=''

  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService) {
    this.pagesNum=0;
    this.pageIndex=0;
    this.onePageData=[]
    this.pagesNumArray=[0]
  }

  ngOnInit(): void {
    this.getSearchTermFromUrl();

  }

getSearchTermFromUrl(){
  this.activatedRoute.paramMap.subscribe({
    next:(value)=>{
     this.slug = value.get('slug')?? ""//if null use an empty string;
    //get searc hValue

      this.getSearchValue(this.slug)

    }
  })
}
getSearchValue(slug:string ){
this.apiService.getSearchResult(slug).subscribe({
  next:(result)=>{
this.searcheResult=result;
this.pagesNum= Math.round( this.searcheResult.length/10)
// for (let index = 0; index < pagesNum; index++) {
//   const element = array[index];

// }
this.goPage(0)

console.log(this.searcheResult,this.pagesNum)
  }
})
}
//------- pagenation ----------
nextPage(){
  if(this.pagesNum<=this.pageIndex+1 ){

  }else{
  this.pageIndex++
  if(this.pageIndex> Math.max(...this.pagesNumArray) ){this.pagesNumArray.push(this.pageIndex)
    console.log('this.pagesNumArray',this.pagesNumArray)
  }


  this.goPage(this.pageIndex)
  }
}
prevPage(){
  this.pageIndex--
  this.pageIndex= this.pageIndex<0 ?  0 : this.pageIndex;
  this.goPage(this.pageIndex)

}
goPage(page:number){
  console.log('page',page , this.pageIndex)
  this.pageIndex=page;
// this.getCatigoryProducts(this.catId,this.pageIndex)

this.onePageData=this.searcheResult.slice(page*10,page*10 + 10)
}

}
