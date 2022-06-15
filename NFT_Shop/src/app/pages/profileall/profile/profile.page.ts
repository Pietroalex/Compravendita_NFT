import { Component, OnInit } from '@angular/core';
import {AvatarService} from "../../../services/avatar.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
  constructor(
    private avatarService: AvatarService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => { this.profile = data; });
  }

  ngOnInit() {
  }


  hide_show(value: string) {
    if(value === "private"){
      document.getElementById('privatesection').setAttribute("style", "display: block; ")
      document.getElementById('publicsection').setAttribute("style", "display: none; ")
    }
    else{
      document.getElementById('publicsection').setAttribute("style", "display: block; ")
      document.getElementById('privatesection').setAttribute("style", "display: none; ")
    }
  }
}
