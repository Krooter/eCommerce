import { IPhoto } from "./photo";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productType: string;
    productTypeId: number;
    productBrand: string;
    productBrandId: number;
    productCategory: string;
    productCategoryId: number;
    photo: IPhoto[];
    dateAdded: Date;
  }