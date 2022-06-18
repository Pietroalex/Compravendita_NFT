import {Component, OnInit} from '@angular/core';
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {doc, Firestore, getDoc, updateDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {deleteUser, getAuth} from "firebase/auth";


@Component({
  selector: 'app-edit_profile',
  templateUrl: './edit_profile.html',
  styleUrls: ['./edit_profile.page.scss'],
})
export class Edit_profilePage implements OnInit {
profile = null;
  infos: FormGroup;

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


  ngOnInit() {
    this.infos = this.fb.group({      //preparare i campi da richiedere nel formGroup
      bio: ['']
    });
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

  async getUser() {
    const userUid = this.profile.uid;
    const docRef = doc(this.firestore, `Users/${userUid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete Profile',
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
    deleteUser(user).then(() => {
      this.router.navigateByUrl('/', {replaceUrl: true});
      alert("Succesfully deleted");

    }).catch((error) => {
     alert("Not deleted")
    });
  }
}

