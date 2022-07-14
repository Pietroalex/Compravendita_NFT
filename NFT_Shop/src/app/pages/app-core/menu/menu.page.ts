import { Component } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";

import { getAuth, signOut } from "firebase/auth";
import {LanguagePopoverPage} from "../language-popover/language-popover.page";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage   {
  profile = null;
  auth: any



  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController,


  ) {    //prepara alcune variabili che necessitano essere impostate dopo che è stato effettuato il login con successo, prende dal DB il profilo dell'utente collegato
    localStorage.setItem('language', 'set')
    this.auth = getAuth();
    this.authService.getUserProfile().subscribe((data) => {
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(this.profile));
        localStorage.setItem('search-field', "profile")
        localStorage.setItem('order-field', "newest")

      });
  }

  async logout() {      //effettua il logout dalla sessione impostando la lingua alla lingua di default e naviga alla pagina di login
    console.log("si esce")
    this.start().then(res => this.continue());
  }
  async start() {
    return new Promise<void>((resolve, reject) => {
      localStorage.setItem('language', 'default')
      signOut(this.auth)
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
