import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthGuard} from "@angular/fire/auth-guard";
import {Auth, getAuth, sendPasswordResetEmail} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup;
  a: any = {};


  constructor(

    private fb: FormBuilder,
    private  alertController: AlertController,
    private translateService: TranslateService

     ) {

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });


    this.translateService.get('ALERT.Forgot.title').subscribe(t => { this.a.title = t; })
    this.translateService.get('ALERT.Forgot.message').subscribe(t =>{ this.a.message = t; })
}
  get email(){
    return this.credentials.get('email');
  }

  ngOnInit() {
  }
  async reset() {
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.credentials.controls['email'].value)
      .then(() => {
        this.showAlert(this.a.title, this.a.message);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

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
