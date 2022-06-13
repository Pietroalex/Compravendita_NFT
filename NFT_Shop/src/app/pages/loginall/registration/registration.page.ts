import {Component, OnInit} from '@angular/core';
import {AvatarService} from "../../../services/avatar.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";


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
  private alertController: AlertController
  ) {
  this.avatarService.getUserProfile().subscribe((data) => { this.profile = data; });
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



}


