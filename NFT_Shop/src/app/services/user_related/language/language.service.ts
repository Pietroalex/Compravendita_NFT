import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {AuthService} from "../login/auth.service";

const LNG_KEY = 'SELECTED_LANGUAGE';

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

    let language = "en";//this.translate.getBrowserLang();
      this.translate.setDefaultLang(language);

   /*
      this.storage.get(LNG_KEY).then(val => {
      if (val){
        this.setLanguage(val);
        this.selected = val;
      }
    })

    */
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
    //this.storage.set(LNG_KEY, lng);

  }
  async updatelang(lng){
    const user = this.authService.getUserId();
    const docRef = doc(this.firestore, `Users/${user}`);

    await updateDoc(docRef, {
      language: lng,
    });
  }
}

