import { Component, OnInit } from '@angular/core';
import {NftService} from "../../services/DBop/nfts/nft.service";
import {NotifyService} from "../../services/DBop/notification/notify.service";
import {Router} from "@angular/router";
import {doc, docData} from "@angular/fire/firestore";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = [];
  ids = [];
  tempo = [];
  profile = null;
  nft = null;

  constructor(
    private nftService: NftService,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  async ngOnInit() {
    localStorage.setItem('notif', "background-color: transparent;")
    let val = localStorage.getItem('notif')
    document.getElementById('notify').setAttribute("style", val)


    this.start().then(res => this.continue());


  }
  async doRefresh(event) {
    console.log('Begin async operation');
    this.notifications = [];
    this.ids = [];
    this.tempo = await this.notifyService.loadNotify(this.profile.uid)
    this.notifications = this.tempo.slice(0, (this.tempo.length/2))
    this.ids = this.tempo.slice((this.tempo.length/2))
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async start() {
    return new Promise<void>((resolve, reject) => {
      this.profile = JSON.parse(localStorage.getItem('profile'));
      resolve();
    });
  }

  async continue() {
    this.tempo = await this.notifyService.loadNotify(this.profile.uid)
    this.notifications = this.tempo.slice(0, (this.tempo.length/2))
    this.ids = this.tempo.slice((this.tempo.length/2))

    console.log(this.ids)
  }

  swipe(value: string) {
    alert(value)
  }

  async delete1Notify(value: number) {
    let id = this.ids[value]
    console.log(value + " " + id)
    await this.notifyService.delete1Notify(id)
    this.doRefresh(event)
  }

  async godetail(i: number) {
    let nftcode = this.notifications[i].nftcode
    this.start2(nftcode).then(res => this.continue2());

  }
  async start2(nftcode) {
    return new Promise<void>(async (resolve, reject) => {
      this.nft = await this.notifyService.load1SoldNFTs(nftcode)
      resolve();
    });
  }

  async continue2() {
    await localStorage.setItem('purchased', JSON.stringify(this.nft));
    this.router.navigateByUrl('/purchase-detail');

  }
}

