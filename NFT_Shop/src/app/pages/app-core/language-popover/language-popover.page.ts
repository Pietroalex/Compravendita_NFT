import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {LanguageService} from "../../../services/user_related/language/language.service";

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  languages = [];
  selected = '';
  check

  constructor(
    private popoverController: PopoverController,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {           //controlla il linguaggio inserito, chiama il servizio di traduzione per cambiare il linguaggio
    this.check = localStorage.getItem('language')
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng){                        //controlla se si è loggati oppure no tramite una variabile nella pagina di login che cambia valore se si entra nella sessione
    if(this.check != 'default') {
      this.languageService.setLanguage(lng);
    }
    else{
      this.languageService.setLanguageTemp(lng);
    }
      this.popoverController.dismiss();
  }
}
