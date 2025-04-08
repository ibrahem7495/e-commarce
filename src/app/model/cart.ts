import { ProdType } from 'src/app/model/prod-type';
export interface Cart {
  id: string;
  userId?: number;
  quantity: number;
  product: ProdType;
}
export interface fackCart {
  id?: number;
  userId: number;
  products:fackPrduct[];
}
export interface fackPrduct {
id:number;
title : string
price:number;
description:string;
category:string;
image:string;

}
