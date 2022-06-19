import { Component, OnInit } from '@angular/core';
import {NFT} from "../../model/NFT";
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {doc, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {getDownloadURL, uploadString} from "@angular/fire/storage";
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  nftInfo: FormGroup;

  profile = null;

  author = "aa";
  itemcount: string;
  nftcode: string;

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

  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });

  }

   ngOnInit() {
    this.nftInfo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      desc: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      username: [''],
      count: [''],
    });


  }



  async pickNFTImage(nftcode : string){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

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
      }
    }
  }

  async createNFT(){

    let name = this.nftInfo.controls['name'].value;
    let desc = this.nftInfo.controls['desc'].value;
    let author = this.profile?.username;
    let itemcount = this.profile?.nft_created_count;
    let nftcode = author +"-"+ itemcount;
    await setDoc(doc(this.firestore, "NFTs", nftcode), {
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
        nft_created_count: itemcount+1,
      });
      await this.pickNFTImage(nftcode);
      return true;
    }catch (e) {
      return null;
    }
}


}
