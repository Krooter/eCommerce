import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImage } from 'src/app/shared/_models/image';
import { IProduct } from 'src/app/shared/_models/product';
import { ShopParams } from 'src/app/shared/_models/shopParams';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  products: IProduct[];
  totalCount: number;
  shopParams = new ShopParams();
  productType: number;
  productSize = "4";
  amount: number = 1;
  image: IImage[];

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(result => {
      this.product = result;
      this.productType = result.productTypeId;
      this.image = [
        {
          imageUrl: result.pictureUrl,
          isMain: true,
          id: 0
        },
        {
          imageUrl: result.pictureUrl,
          isMain: false,
          id: 1
        },
        {
          imageUrl: result.pictureUrl,
          isMain: false,
          id: 2
        },
        {
          imageUrl: result.pictureUrl,
          isMain: false,
          id: 3
        },
        {
          imageUrl: result.pictureUrl,
          isMain: false,
          id: 4
        }
      ]
      this.getSimilarProducts();
    }, error => {
      console.log(error);
    })
  }
  getSimilarProducts() {
    this.shopService.getSimilarProducts(this.productType, this.productSize).subscribe(result => {
      this.products = result.data;
    }, error => {
      console.log(error);
    })
  }
  increment(){
    this.amount++;
  }
  decrement(){
    if(this.amount >= 2){
      this.amount--;
    }
  }
  setMain(id:number){
    for(let i = 0; i < this.image.length; i++){
      if(this.image[i].isMain === true){
        this.image[i].isMain = false;
        this.image[id].isMain = true;
      }
    }
  }
}
