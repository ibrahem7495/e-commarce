import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit  {
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
