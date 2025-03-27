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
  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.getSearchTermFromUrl();

  }

getSearchTermFromUrl(){
  this.activatedRoute.paramMap.subscribe({
    next:(value)=>{
      const slug = value.get('slug')?? ""//if null use an empty string;
    //get searc hValue
      this.getSearchValue(slug)

    }
  })
}
getSearchValue(slug:string ){
this.apiService.getSearchResult(slug).subscribe({
  next:(result)=>{
this.searcheResult=result;
console.log(this.searcheResult)
  }
})
}
}
