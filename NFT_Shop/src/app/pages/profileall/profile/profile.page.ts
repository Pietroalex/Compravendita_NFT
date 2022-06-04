import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

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
