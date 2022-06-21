import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NFT, OnSaleNFT} from "../../../services/DBop/nfts/nft.service";
import {observable, Observable} from "rxjs";



@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.page.html',
  styleUrls: ['./gallery-detail.page.scss'],
})
export class GalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  sellnft: ParamMap;

  constructor(

    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
/*
    this.nft = this.route.snapshot.paramMap.getAll('nft');
    console.log(this.nft.nftcode)

 */

    this.route.paramMap.subscribe(params => {
      console.log(params);
         this.nftcode = params.get('nftcode');
         this.image = params.get('image');
         this.name = params.get('name');
         this.description = params.get('description');
         this.author = params.get('author');
         this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
      this.sellnft = params;
    });

    console.log(this.sellnft);
}

  tosell() {
   // this.router.navigateByUrl("/sell-nft/", this.sellnft)
  }
}
