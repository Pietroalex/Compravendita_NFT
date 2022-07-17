import {Component, OnInit} from '@angular/core';
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {deleteDoc, doc, Firestore, getDoc, updateDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {deleteUser, getAuth, signOut} from "firebase/auth";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile = null;
  infos: FormGroup;
  ip: string;
  a: any = {};

  constructor(
  private avatarService: AvatarService,
  private authService: AuthService,
  private router: Router,
  private loadingController: LoadingController,
  private alertController: AlertController,
  private firestore: Firestore,
  private auth: Auth,
  private fb: FormBuilder,
  private translateService: TranslateService
  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });      //ritirare i dati già presenti sul database
    this.translateService.get('ALERT.EditProfile.title1').subscribe(t => { this.a.title1 = t; })
    this.translateService.get('ALERT.EditProfile.message1').subscribe(t =>{ this.a.message1 = t; })
    this.translateService.get('ALERT.EditProfile.title2').subscribe(t => { this.a.title2 = t; })
    this.translateService.get('ALERT.EditProfile.message2').subscribe(t =>{ this.a.message2 = t; })
    this.translateService.get('ALERT.EditProfile.title3').subscribe(t => { this.a.title3 = t; })
    this.translateService.get('ALERT.EditProfile.message3').subscribe(t =>{ this.a.message3 = t; })
    this.translateService.get('ALERT.EditProfile.title4').subscribe(t => { this.a.title4 = t; })
    this.translateService.get('ALERT.EditProfile.message4').subscribe(t =>{ this.a.message4 = t; })
    this.translateService.get('ALERT.EditProfile.confirm1').subscribe(t => { this.a.confirm1 = t; })
    this.translateService.get('ALERT.EditProfile.title5').subscribe(t => { this.a.title5 = t; })
    this.translateService.get('ALERT.EditProfile.message5').subscribe(t =>{ this.a.message5 = t; })
    this.translateService.get('ALERT.EditProfile.confirm2').subscribe(t => { this.a.confirm2 = t; })
    this.translateService.get('ALERT.EditProfile.message6').subscribe(t =>{ this.a.message6 = t; })
    this.translateService.get('ALERT.EditProfile.cancel').subscribe(t =>{ this.a.cancel = t; })
  }

  async back() {
    await this.router.navigateByUrl('/profile', { replaceUrl: true });
  }

  ngOnInit() {
    this.infos = this.fb.group({      //preparare i campi da richiedere nel formGroup
      bio: ['', [Validators.maxLength(60)]]
    });
  }
    async ps(){
    this.ip = this.profile?.username;
    }
  async changeImage(){                                                      //cambiare immagine
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
            header: this.a.title1,
            message: this.a.message1,
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
  }



  async updateInfo() {

    const profileRef = doc(this.firestore, "Users", this.auth.currentUser.uid);
                                                                          //caricare sul database i dati cambiati
     await updateDoc(profileRef, {
      bio: this.infos.controls['bio'].value
    });
    const result = this.profile.bio ==  this.infos.controls['bio'].value;

    if(!result){
      const alert = await this.alertController.create({
        header: this.a.title2,
        message: this.a.message2,
        buttons: ['OK'],
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: this.a.title3,
        message: this.a.message3,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  async delete(){
      let alert = await this.alertController.create({
        header: this.a.title4,
        message: this.a.message4,
        cssClass: 'buttonCss',
        buttons: [
          {
            text: this.a.cancel,
            role: 'cancel',
            cssClass: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.a.confirm1,
            cssClass: 'confirm',
            handler: () => {
              console.log('Delete clicked');
            this.presentConfirm();
            }
          }
        ]
      });
      alert.present();
    }
  async presentConfirm() {
    let alert = await this.alertController.create({
      header: this.a.title5,
      message: this.a.message5,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: this.a.cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.a.confirm2,
          cssClass: 'confirm',
          handler: () => {
            console.log('Sure clicked');
            this.deleteUser();
          }
        }
      ]
    });
    alert.present();
  }
  async deleteUser(){
    const auth = getAuth();
    const user = auth.currentUser;
    let privateGallery = this.profile?.privateGallery;
    let count = this.profile?.nft_created_count;
    let cashart = this.profile?.cashart;
    this.start(user).then(res => this.continue(privateGallery, count, cashart, user));
  }
  async start(user) {
    return new Promise<void>((resolve, reject) => {
      deleteUser(user)
        alert(this.a.message6);
      resolve();
    });
  }

  async continue(privateGallery, count, cashart, user) {
    if ((privateGallery.length == 0) && count == 0 && cashart == 5000){
      deleteDoc(doc(this.firestore, "Users", user.uid));
    }
    await this.router.navigateByUrl('/', {replaceUrl: true})
  }

}


