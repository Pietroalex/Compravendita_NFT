import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {User} from "../../model/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;


  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private db: Firestore,
  ) { }

  get email(){
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  async register(){
    let uid = null;
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();


    if (user) {
      this.router.navigateByUrl('/menu/home', {replaceUrl: true});

      uid = this.authService.getUserId();
      let email = this.credentials.controls['email'].value;
      await setDoc(doc(this.db, "Users", uid), {
        uid: uid,
        username: "user",
        image: `https://firebasestorage.googleapis.com/v0/b/nft-shop-c77dd.appspot.com/o/uploads%2Ficon.png?alt=media&token=0c5b1aa1-f887-404c-a0b4-cd2ad8c6fa64`,
        email: email,
        bio: "user bio",
        cashart: 5000,
        nft_created_count: 0,
      });


    } else {
      this.showAlert('Registration failed', 'Please check if you have typed a <b>valid email</b> (ex: <b>example@email.com</b>) and/or a <b>valid password</b> (<b>it requires a minimum length of 6</b>) and try again!');
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/menu/home', {replaceUrl: true});
    } else {
        this.showAlert('Login failed', '<b>Email</b> or <b>Password</b> must be wrong, please try again or <b>create a new account</b> if you\'re not registered yet!');
    }

  }



    async showAlert(header, message){
    const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
    }



}
