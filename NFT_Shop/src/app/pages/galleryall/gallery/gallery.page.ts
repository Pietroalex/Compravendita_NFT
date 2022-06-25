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
    private router: Router
  ) {
    console.log("appena avviato")
    const result = JSON.parse(localStorage.getItem('profile'));
    console.log(result)
    this.profile = result;
  }

  async ngOnInit() {

    this.loadAllNFTs()

  }




  async loadAllNFTs() {

    let privateGallery = this.profile?.privateGallery;

    for (const nftcode of privateGallery) {

      this.tempo = await this.nftService.loadAllGalleryNFTs(nftcode);
      this.nfts.push(this.tempo[0]);
      this.tempo = [];
    }


  }
    ngOnDestroy() {
      this.nfts = [];
      this.profile = null;
      console.log("uscendo")
    }

  async create() {
    await this.router.navigateByUrl('/new-item', { replaceUrl: true });
  }
}
