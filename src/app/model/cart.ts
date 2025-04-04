import { ProdType } from 'src/app/model/prod-type';
export interface Cart {
  id: string;
  userId?: number;
  quantity: number;
  product: ProdType;

}

