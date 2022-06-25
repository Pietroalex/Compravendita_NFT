import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  nftInfo: FormGroup;
  profile = null;

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
    private route: ActivatedRoute



  ) {
    //this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    const result = JSON.parse(localStorage.getItem('profile'));
    console.log(result)
    this.profile = result;

  }

   ngOnInit() {
    this.nftInfo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      desc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],

    });


  }



  async pickNFTImage(nftcode : string){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if(image){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.nftService.uploadNFTImage(image, nftcode);
      loading.dismiss();

      if(!result){
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
        await deleteDoc(doc(this.firestore, "NFTs", nftcode));
      }else{
        this.authService.getUserProfile().subscribe((data) => { this.profile = data; localStorage.setItem('profile', JSON.stringify(this.profile)); });

      }
    }

  }

  async createNFT(){

    let name = this.nftInfo.controls['name'].value;
    let desc = this.nftInfo.controls['desc'].value;
    let author = this.profile?.username;
    let itemcount = 1+this.profile?.nft_created_count;
    let nftcode = author +"-"+ itemcount;
    await setDoc(doc(this.firestore, "NFTs", nftcode), {                                  //crea il documento del NFT
      nftcode: nftcode,
      image: "img",
      name: name,
      description: desc,
      author: this.authService.getUserId(),
     });

    try {
      const user = this.profile.uid;
      const docRef = doc(this.firestore, `Users/${user}`);

      await updateDoc(docRef, {
        nft_created_count: increment(1),
        privateGallery: arrayUnion(nftcode)               //aggiunge l'nftcode all'array privateGallery dentro il profilo utente corrente
      });
      await this.pickNFTImage(nftcode);

       await this.router.navigateByUrl('/gallery', { replaceUrl: true });

      return true;
    }catch (e) {
      return null;
    }

}


  async back() {
    await this.router.navigateByUrl('/gallery', { replaceUrl: true });
  }
}
