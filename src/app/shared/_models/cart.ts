import { v4 as uuidv4 } from 'uuid'
import { IPhoto } from './photo';

export interface ICart {
    id: string;
    items: ICartItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryId?: number;
    shippingPrice?: number;
  }
  
export interface ICartItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Cart implements ICart {
  id = uuidv4();
  items: ICartItem[] = [];
}

export interface ICartTotals {
  shipping: number;
  subtotal: number;
  total: number;
}