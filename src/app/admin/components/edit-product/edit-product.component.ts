import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';
import { FormArray, FormBuilder, FormGroup , Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productId:number=0;
  product?:ProdType;
  str:string=''
  editProduct:FormGroup
  constructor(private activatedRoute:ActivatedRoute , private apiService:ApiService,private fb:FormBuilder) {
    this.editProduct=this.fb.group({
      id:['',Validators.required],
        title: ['',Validators.required,Validators.minLength(6) ],
        slug: ['',Validators.required,Validators.minLength(6)],
        price: ['',Validators.required],
        description: ['',Validators.required,Validators.minLength(15)],
        category:fb.group({
          id: ['',Validators.required],
          name: ['',Validators.required,Validators.minLength(6) ],
          slug: ['',Validators.required,Validators.minLength(6) ],
          image:['',Validators.required ],

        }) ,
        images:this.fb.array([this.fb.control('',Validators.required)])
    })
  }
get f(){
  return this.editProduct.controls
}
get images(): FormArray {
  return this.editProduct?.get('images') as FormArray;
}
  ngOnInit(): void {
    this.getProductIdFromUrl();
    // this.getProductToEdit(this.productId);

}
onsubmit(){
  console.log('this.editProduct.value',this.editProduct.value)
  this.apiService.editProductById(this.editProduct.value , this.productId).subscribe({
next:()=>{alert('edit successfuly')},
error:(err)=>{
console.error(err)
  }
  })

}
getProductIdFromUrl(){
  this.activatedRoute.paramMap.subscribe({
    next:(value)=>{
      this.productId = Number(value.get('prodIdForEditing'))
      this.getProductToEdit(this.productId);
    }
  })
}
getProductToEdit(id :number){
  console.log('id',id)
  this.apiService.getPrductById(id).subscribe({
    next:(value)=>{
      this.product=value
    console.log('product',this.product)
    }
  })
}

addImage(){
  this.images.push(this.fb.control('',Validators.required))
}

}
