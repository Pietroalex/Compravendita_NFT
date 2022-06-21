import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  onsale_date: Date;
  price: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.nftcode = params.get('nftcode');
      this.image = params.get('image');
      this.name = params.get('name');
      this.description = params.get('description');
      this.author = params.get('author');
      this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
      this.seller = params.get('seller');
     // this.onsale_date = params.get('onsale_date');
     // this.price = params.get('price');
    });

  }

}
