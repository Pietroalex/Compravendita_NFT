import { Component } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";

import { getAuth, signOut } from "firebase/auth";
import {LanguagePopoverPage} from "../language-popover/language-popover.page";
import {LanguageService} from "../../../services/user_related/language/language.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage   {
  profile = null;
  auth: any
  check1: string;
  check2: string;



  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController,
    private languageService: LanguageService


  ) {    //prepara alcune variabili che necessitano essere impostate dopo che è stato effettuato il login con successo, prende dal DB il profilo dell'utente collegato


    this.auth = getAuth();
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
      localStorage.setItem('profile', JSON.stringify(this.profile));
      localStorage.setItem('search-field', "profile")
      localStorage.setItem('order-field', "newest")

      this.start1().then((val) => this.continue1());
    });

  }
  start1() {                                             //controlla e prepara i dummy secondo il numero di item ricevuti dalla funzione dopo aver preso il profilo utente
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
  continue1(){

    this.check2 = localStorage.getItem('language')
    this.check1 = localStorage.getItem('view')


    if(this.check1 == 'login'){
      localStorage.setItem('view', 'not-login')
      if(this.check2 == 'set') {
        this.languageService.setLanguage(this.languageService.selected);
      }else{
        this.languageService.setLanguageTemp(this.profile?.language);
      }
    }else{
      this.languageService.setLanguageTemp(this.profile?.language);
    }
  }

  async logout() {      //effettua il logout dalla sessione impostando la lingua alla lingua di default e naviga alla pagina di login

    this.start().then(res => this.continue());
  }
  async start() {
    return new Promise<void>((resolve, reject) => {
      localStorage.setItem('language', 'default')
      localStorage.setItem('view', 'login')
      signOut(this.auth)
      console.log("Log Out")
      resolve();
    });
  }

  async continue() {
    await this.router.navigateByUrl('/', {replaceUrl: true})
  }

  async openLangPop($event) { // permette di aprire il menu a tendina per la scelta del linguaggio
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }
}
