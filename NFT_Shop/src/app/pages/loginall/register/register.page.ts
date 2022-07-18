import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {collection, doc, Firestore, getDocs, query, setDoc, where} from "@angular/fire/firestore";
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithRedirect, signOut} from "@angular/fire/auth";
import firebase from "firebase/compat";
import AuthProvider = firebase.auth.AuthProvider;
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registers: FormGroup;
  message: string;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private db: Firestore,
    private translateService: TranslateService

  ) {
    this.message = "no-need";
  }



  ngOnInit() {

    this.registers = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      bio: [''],
    });

  }

  async register() {

    const auth = getAuth();
    let email = this.registers.controls['email'].value;
    let password = this.registers.controls['password'].value;
    let username = this.registers.controls['username'].value;
    let bio = this.registers.controls['bio'].value;

    if(bio == '' ){
      bio = "Hi there, I'm using NFT-Shop!";
    }

    let a: any = {};
    this.translateService.get('ALERT.Register.title').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.Register.button1').subscribe(t => { a.button1 = t; })
    this.translateService.get('ALERT.Register.button2').subscribe(t => { a.button2 = t; })
    this.translateService.get('ALERT.Register.message1').subscribe(t =>{ a.message1 = t; })
    this.translateService.get('ALERT.Register.message2').subscribe(t =>{ a.message2 = t; })
    this.translateService.get('ALERT.Register.message3').subscribe(t =>{ a.message3 = t; })
    this.translateService.get('ALERT.Register.title2').subscribe(t =>{ a.title2 = t; })
    this.translateService.get('ALERT.Register.message4').subscribe(t =>{ a.message3 = t; })
    if(/^[A-Za-z0-9]*$/.test(username)) {
      const result = await this.checkUsername(username);
      if (result) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user.uid;
            await setDoc(doc(this.db, "Users", user), {
              uid: user,
              username: username,
              image: `https://firebasestorage.googleapis.com/v0/b/nft-shop-c77dd.appspot.com/o/uploads%2Ficon.png?alt=media&token=0c5b1aa1-f887-404c-a0b4-cd2ad8c6fa64`,
              email: email,
              bio: bio,
              cashart: 5000,
              nft_created_count: 0,
              privateGallery: [],
              publicGallery: [],
              language : "en"
            });
            this.showAlert(a.title2, a.message3, a.button1)
            signOut(auth).then(() => this.router.navigateByUrl('/home', {replaceUrl: true}))

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.showAlert(a.title, a.message1, a.button2);

          });
      } else {
        this.showAlert(a.title, a.message2, a.button2)
      }
    } else {
      this.showAlert(a.title, a.message3, a.button2)
    }
  }


  async showAlert(header, message, button) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [button],
    });
    await alert.present();
  }

  async checkUsername(username: string){
    const usersRef = collection(this.db, "Users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return(querySnapshot.empty);

  }

  async showMessage(){this.message = "need";}
  async hideMessage(){this.message = "no-need";}
}
