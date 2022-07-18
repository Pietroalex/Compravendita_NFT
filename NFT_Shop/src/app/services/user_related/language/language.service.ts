import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {AuthService} from "../login/auth.service";



@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = ' ';

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  setInitialAppLanguage(){

    let language = "en";
      this.translate.setDefaultLang(language);
      this.selected = "en"

  }
  getLanguages(){
    return [
      {
        text: 'English', value: 'en'
      },
      {
        text: 'Italian', value: 'it'
      },
    ];
}

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.updatelang(lng);
  }
  setLanguageTemp(lng) {
    this.translate.use(lng);
    this.selected = lng;
    localStorage.setItem('language', 'set')
  }
  async updatelang(lng){
    const user = this.authService.getUserId();
    const docRef = doc(this.firestore, `Users/${user}`);

    await updateDoc(docRef, {
      language: lng,
    });
  }
}

