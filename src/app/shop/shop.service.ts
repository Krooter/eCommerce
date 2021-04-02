import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/_models/brand';
import { IBrandType } from '../shared/_models/brandTypes';
import { IPagination } from '../shared/_models/pagination';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/_models/shopParams';
import { IProduct } from '../shared/_models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  shopParams: ShopParams;
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }
 
    if(shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search)
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getSimilarProducts(typeId: number, size: string){
    let params = new HttpParams();

    if(typeId){
      params = params.append('typeId', typeId.toString());
    }

    if(size){
      params = params.append('pageSize', size);
    }
    
    return this.http.get<IPagination>(this.baseUrl + 'Products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getBrandTypes() {
    return this.http.get<IBrandType[]>(this.baseUrl + 'products/types');
  }
}
