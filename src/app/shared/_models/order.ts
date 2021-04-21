import { IAddress } from "./address";

export interface IOrderToCreat {
    cartId: string;
    deliveryId: number;
    shipToAddress: IAddress;
}

export interface OrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    delivery: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
}