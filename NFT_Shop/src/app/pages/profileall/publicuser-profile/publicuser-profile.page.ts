import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InformationService} from "../../../services/user_related/check_user/information.service";

@Component({
  selector: 'app-publicuser-profile',
  templateUrl: './publicuser-profile.page.html',
  styleUrls: ['./publicuser-profile.page.scss'],
})
export class PublicuserProfilePage implements OnInit {
  author: string;
  profile = null;
  constructor(    private router: Router,
                  private route: ActivatedRoute,
                  private infoService: InformationService,
  ) {

  }

  async ngOnInit() {
    this.author = this.route.snapshot.paramMap.get('author');
    console.log(this.author)
    await this.infoService.getUserProfile(this.author).subscribe((data) => {
      this.profile = data;
    });
  }

}
