import { Component, OnInit } from '@angular/core';
import {NftService} from "../../services/DBop/nfts/nft.service";
import {NotifyService} from "../../services/DBop/notification/notify.service";

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


  constructor(
    private nftService: NftService,
    private notifyService: NotifyService
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
}

