import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {getDoc, Firestore, doc, docData} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {NFT, NftService} from "../../../services/DBop/nfts/nft.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  nfts = [];
  profile = null;
  num = 0;



  constructor(
    private db: Firestore,
    private authService: AuthService,
    private nftService: NftService,
    private router: Router,
  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data ; this.loadAllNFTs();});


  }

  ngOnInit() {

  }

  async loadAllNFTs() {

    let privateGallery = this.profile?.privateGallery;
    for (const nftcode of privateGallery) {
      this.nftService.loadAllNFTs(nftcode).subscribe(res => {
        this.nfts.push(res) ;
      });

    }
  }

}
