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


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
profile = null;
  infos: FormGroup;
ip: string;
  constructor(
  private avatarService: AvatarService,
  private authService: AuthService,
  private router: Router,
  private loadingController: LoadingController,
  private alertController: AlertController,
  private firestore: Firestore,
  private auth: Auth,
  private fb: FormBuilder,

  ) {
  this.authService.getUserProfile().subscribe((data) => { this.profile = data; });      //ritirare i dati già presenti sul database
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
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
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
        header: 'Update failed',
        message: 'There was a problem uploading your infos.',
        buttons: ['OK'],
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: 'Great!',
        message: 'Profile info successfully updated.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  async delete(){
      let alert = await this.alertController.create({
        header: 'Confirm deletion',
        message: 'Do you want to delete your profile? Chose wisely',
        cssClass: 'buttonCss',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete Profile',
            cssClass: 'confirm',
            handler: () => {
              console.log('Buy clicked');
            this.presentConfirm();
            }
          }
        ]
      });
      alert.present();
    }
  async presentConfirm() {
    let alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'After accepting, the profile will stay untouched but your credentials will be deleted forever and you will not be able to access your profile anymore',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'I\'m Sure',
          handler: () => {
            console.log('sure clicked');
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
        alert("Succesfully deleted");
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


