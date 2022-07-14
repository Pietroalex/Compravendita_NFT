import { Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import { AlertController } from "@ionic/angular";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {LanguageService} from "../../../services/user_related/language/language.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {

  profile = null;
  nfts = [];
  shop: string;
  shopdummy1: string;
  shopdummy2: string;
  shopdummy3: string;
  shopdummy4: string;
  shopdummy5: string;
  shopdummy6: string;


  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private nftService: NftService,
    private languageService: LanguageService,
  ) {                                                         //inizializza i dummy della home
    this.shop = 'need';
    this.shopdummy1 = 'no-need-copy';
    this.shopdummy2 = 'no-need-copy'
    this.shopdummy3 = 'no-need-copy'
    this.shopdummy4 = 'no-need-copy'
    this.shopdummy5 = 'no-need-copy'
    this.shopdummy6 = 'no-need-copy'
  }


  ngOnInit() {
    this.start().then(() => this.continue());
  }

   start() {                                             //controlla e prepara i dummy secondo il numero di item ricevuti dalla funzione dopo aver preso il profilo utente
     return new Promise<void>((resolve, reject) => {
       this.authService.getUserProfile().subscribe(async (data) => {
         this.profile = data;
         this.nfts = await this.nftService.get6lastonsaleNFTs();
         switch(this.nfts.length){
           case 0:
             this.shopdummy1 = 'need-a-copy';
             this.shopdummy2 = 'need-copy';
             this.shopdummy3 = 'need-copy';
             this.shopdummy4 = 'need-copy';
             this.shopdummy5 = 'need-copy';
             this.shopdummy6 = 'need-copy';
             break;
           case 1:
             this.shopdummy1 = 'need-copy';
             this.shopdummy2 = 'need-copy';
             this.shopdummy3 = 'need-copy';
             this.shopdummy4 = 'need-copy';
             this.shopdummy5 = 'need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
           case 2:
             this.shopdummy1 = 'need-copy';
             this.shopdummy2 = 'need-copy';
             this.shopdummy3 = 'need-copy';
             this.shopdummy4 = 'need-copy';
             this.shopdummy5 = 'no-need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
           case 3:
             this.shopdummy1 = 'need-copy';
             this.shopdummy2 = 'need-copy';
             this.shopdummy3 = 'need-copy';
             this.shopdummy4 = 'no-need-copy';
             this.shopdummy5 = 'no-need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
           case 4:
             this.shopdummy1 = 'need-copy';
             this.shopdummy2 = 'need-copy';
             this.shopdummy3 = 'no-need-copy';
             this.shopdummy4 = 'no-need-copy';
             this.shopdummy5 = 'no-need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
           case 5:
             this.shopdummy1 = 'need-copy';
             this.shopdummy2 = 'no-need-copy';
             this.shopdummy3 = 'no-need-copy';
             this.shopdummy4 = 'no-need-copy';
             this.shopdummy5 = 'no-need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
           case 6:
             this.shopdummy1 = 'no-need-copy';
             this.shopdummy2 = 'no-need-copy';
             this.shopdummy3 = 'no-need-copy';
             this.shopdummy4 = 'no-need-copy';
             this.shopdummy5 = 'no-need-copy';
             this.shopdummy6 = 'no-need-copy';
             break;
         }
         localStorage.setItem('profile', JSON.stringify(this.profile));
         localStorage.setItem('seller', "null");

       });
       resolve();
     });
  }

   continue() {

     const profile = JSON.parse(localStorage.getItem('profile'));
     this.languageService.setLanguage(profile?.language);


  }


  async refresh() {                 //aggiorna la lista di item presenti senza ricaricare la pagina o navigare altrove
    this.nfts = [];
    this.nfts = await this.nftService.get6lastonsaleNFTs();
    switch(this.nfts.length){
      case 0:
        this.shopdummy1 = 'need-a-copy';
        this.shopdummy2 = 'need-copy';
        this.shopdummy3 = 'need-copy';
        this.shopdummy4 = 'need-copy';
        this.shopdummy5 = 'need-copy';
        this.shopdummy6 = 'need-copy';
        break;
      case 1:
        this.shopdummy1 = 'need-copy';
        this.shopdummy2 = 'need-copy';
        this.shopdummy3 = 'need-copy';
        this.shopdummy4 = 'need-copy';
        this.shopdummy5 = 'need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
      case 2:
        this.shopdummy1 = 'need-copy';
        this.shopdummy2 = 'need-copy';
        this.shopdummy3 = 'need-copy';
        this.shopdummy4 = 'need-copy';
        this.shopdummy5 = 'no-need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
      case 3:
        this.shopdummy1 = 'need-copy';
        this.shopdummy2 = 'need-copy';
        this.shopdummy3 = 'need-copy';
        this.shopdummy4 = 'no-need-copy';
        this.shopdummy5 = 'no-need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
      case 4:
        this.shopdummy1 = 'need-copy';
        this.shopdummy2 = 'need-copy';
        this.shopdummy3 = 'no-need-copy';
        this.shopdummy4 = 'no-need-copy';
        this.shopdummy5 = 'no-need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
      case 5:
        this.shopdummy1 = 'need-copy';
        this.shopdummy2 = 'no-need-copy';
        this.shopdummy3 = 'no-need-copy';
        this.shopdummy4 = 'no-need-copy';
        this.shopdummy5 = 'no-need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
      case 6:
        this.shopdummy1 = 'no-need-copy';
        this.shopdummy2 = 'no-need-copy';
        this.shopdummy3 = 'no-need-copy';
        this.shopdummy4 = 'no-need-copy';
        this.shopdummy5 = 'no-need-copy';
        this.shopdummy6 = 'no-need-copy';
        break;
    }
  }
}


