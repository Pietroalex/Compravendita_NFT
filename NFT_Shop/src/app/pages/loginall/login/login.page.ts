import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, PopoverController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {LanguageService} from "../../../services/user_related/language/language.service";
import {LanguagePopoverPage} from "../../app-core/language-popover/language-popover.page";
import {TranslateService} from "@ngx-translate/core";


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
    private popoverController: PopoverController,
    private translateService: TranslateService
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


  async login(){
    const loading = await this.loadingController.create();
    await loading.present();



    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    let a: any = {};
    this.translateService.get('ALERT.Login.title').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.Login.message').subscribe(t =>{ a.message = t; })

    if (user) {

      this.router.navigateByUrl('/menu/home', {replaceUrl: true});
    } else {
        this.showAlert(a.title, a.message);
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


  async openLangPop($event) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }
}
