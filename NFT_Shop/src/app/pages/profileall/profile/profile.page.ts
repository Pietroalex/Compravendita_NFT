import { Component, OnInit } from '@angular/core';
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {AuthService} from "../../../services/user_related/login/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
  constructor(
    private authService: AuthService,
  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
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
