import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {getDoc, Firestore, doc, docData} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";
import {NFT, NftService} from "../../../services/DBop/nfts/nft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {toArray} from "rxjs/operators";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit, OnDestroy {

  nfts = [];
  profile = null;
  result = null;
  num = 0;
  tempo = [];

  constructor(
    private db: Firestore,
    private authService: AuthService,
    private nftService: NftService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {

    this.result = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    console.log(this.result);
    console.log(this.result);
    if(this.result == "null"){
      this.authService.getUserProfile().subscribe((data) => { this.profile = data; this.loadAllNFTs() });
    }else{
      this.profile = this.result;
      this.loadAllNFTs()
    }


  }




  async loadAllNFTs() {

    let privateGallery = this.profile?.privateGallery;
    console.log(privateGallery)
    for (const nftcode of privateGallery) {

      this.tempo = await this.nftService.loadAllGalleryNFTs(nftcode);
      this.nfts.push(this.tempo[0]);
      this.tempo = [];
    }
  }
    ngOnDestroy() {
      this.nfts = [];
    }

}
