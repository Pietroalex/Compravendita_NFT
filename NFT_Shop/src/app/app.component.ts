import { Component } from '@angular/core';
import {LanguageService} from "./services/user_related/language/language.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private platform: Platform,
    private languageService: LanguageService
  ) {

  this.inizializeApp();
  }
inizializeApp(){
    this.platform.ready().then(() =>{
      this.languageService.setInitialAppLanguage();
    })
}


}
