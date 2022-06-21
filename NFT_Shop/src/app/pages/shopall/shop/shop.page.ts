import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {collectionData, doc, docData, Firestore, getDoc} from "@angular/fire/firestore";
import {NftService} from "../../../services/DBop/nfts/nft.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  nfts = [];
  constructor(
    private router: Router,
    private firestore: Firestore,
    private nftService: NftService
  ) {
    this.nftService.loadAllOnSaleNFTs().subscribe(res => {
      this.nfts = res;
      console.log(res)
    })
  }

  ngOnInit() {

  }

}
