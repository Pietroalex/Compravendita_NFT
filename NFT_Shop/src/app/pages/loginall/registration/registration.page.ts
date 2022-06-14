import {Component, OnInit} from '@angular/core';
import {AvatarService} from "../../../services/avatar.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {doc, Firestore, getDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
profile = null;

  constructor(
  private avatarService: AvatarService,
  private authService: AuthService,
  private router: Router,
  private loadingController: LoadingController,
  private alertController: AlertController,
  private firestore: Firestore,
  private auth: Auth,
  ) {
  //this.avatarService.getUserProfile().subscribe((data) => { this.profile = data; });
  }
  ngOnInit() {}

  async changeImage(){
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

        const result = await this.avatarService.uploadImage(image);
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


  async getUser() {
    const userUid = this.auth.currentUser.uid;
    const docRef = doc(this.firestore, `Users/${userUid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }
}


