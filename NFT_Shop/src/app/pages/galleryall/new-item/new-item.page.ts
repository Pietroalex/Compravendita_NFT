import {Component, OnDestroy, OnInit} from '@angular/core';

import {NftService} from "../../../services/DBop/nfts/nft.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, NavParams} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {
  arrayUnion,
  deleteDoc,
  doc,
  Firestore,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {AuthService} from "../../../services/user_related/login/auth.service";

import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {deleteObject, getStorage, ref} from "@angular/fire/storage";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit, OnDestroy {

  nftInfo: FormGroup;
  profile = null;
  nftcode: string;
  imageUrl: string;
  checkNFT: boolean;

  get name() {
    return this.nftInfo.get('name');
  }

  get desc() {
    return this.nftInfo.get('desc');
  }


  constructor(
    private fb: FormBuilder,
    private nftService: NftService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService


  ) {
    //this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    const result = JSON.parse(localStorage.getItem('profile'));
    this.profile = result;

    this.imageUrl = localStorage.getItem('image')

    this.nftcode = localStorage.getItem('nftcode')
    this.checkNFT = false;
  }

   ngOnInit() {
    this.nftInfo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      desc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    });
  }


  async createNFT(){

    let name = this.nftInfo.controls['name'].value;
    let desc = this.nftInfo.controls['desc'].value;

    try {
    await setDoc(doc(this.firestore, "NFTs", this.nftcode), {                                  //crea il documento del NFT
      nftcode: this.nftcode,
      image: this.imageUrl,
      name: name,
      description: desc,
      author: this.authService.getUserId(),
    });

      const user = this.profile.uid;
      const docRef = doc(this.firestore, `Users/${user}`);

      await updateDoc(docRef, {
        nft_created_count: increment(1),
        privateGallery: arrayUnion(this.nftcode)               //aggiunge l'nftcode all'array privateGallery dentro il profilo utente corrente
      });

      this.checkNFT = true;
      this.authService.getUserProfile().subscribe((data) => { this.profile = data; localStorage.setItem('profile', JSON.stringify(this.profile)); });
      await this.router.navigateByUrl('/gallery', { replaceUrl: true });

      return true;
    }catch (e) {
      await deleteDoc(doc(this.firestore, "NFTs", this.nftcode));
      await this.showError();
      return null;
    }

  }
  async backNoImage() {
    await this.router.navigateByUrl('/gallery', { replaceUrl: true });
}



  ngOnDestroy(): void {

    if (!this.checkNFT) {
      const storage = getStorage();
      const path = ref(storage, `uploads/nft_images/${this.nftcode}/nftimage.png`);

      // Delete the file
      deleteObject(path).then(async () => {
        await this.showError();
      })
    }
  }
  async showError() {
    let a: any = {};
    this.translateService.get('ALERT.NewItem.title').subscribe(t => {
      a.title = t;
    })
    this.translateService.get('ALERT.NewItem.message').subscribe(t => {
      a.message = t;
    })
    const alert = await this.alertController.create({
      header: a.title,
      message: a.message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
