import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AlertController, ModalController} from "@ionic/angular";
import {arrayUnion, deleteDoc, doc, setDoc} from "@angular/fire/firestore";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {getAuth} from "firebase/auth";



@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.page.html',
  styleUrls: ['./gallery-detail.page.scss'],
})
export class GalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;

  params: any;
  overlay: string;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private nftService: NftService,
    private alertController: AlertController


  ) { this.overlay = "hide"; }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
         this.nftcode = params.get('nftcode');
         this.image = params.get('image');
         this.name = params.get('name');
         this.description = params.get('description');
         this.author = params.get('author');
         this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
          this.params = params;
    });

}
  async topublic(){
    await this.nftService.copytopublic(this.params);
  }

  async back() {
    await this.router.navigateByUrl('/gallery', { replaceUrl: true });
  }
  async gotoauthor() {
    localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }


  async deletenft(){
    let alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Do you want to delete your NFT? Chose wisely',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete NFT',
          handler: () => {

            this.presentConfirm();
          }
        }
      ]
    });
    alert.present();
  }
  async presentConfirm() {
    let alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'After accepting, the NFT will be deleted forever and you will not be able to recover it in any way possible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'I\'m Sure',
          handler: async () => {

            await this.nftService.deleteNft(this.nftcode);
            await this.router.navigateByUrl('/gallery', { replaceUrl: true });


          }
        }
      ]
    });
    alert.present();
  }

  async show(){
    this.overlay = "show";
  }
  async hide(){
    this.overlay = "hide";
  }
}
