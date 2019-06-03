import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import axios from 'axios';
import { SERVER_API, getAuth } from '../utils';
import { ProfileOptionComponent } from '../profile-option/profile-option.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  profile: object;
  gallery: Array<any>;
  encode: Array<object>;
  loading: boolean;

  text: string;

  constructor(public popoverController: PopoverController, private actvRoute: ActivatedRoute) { }


  async ngOnInit() {
    if (this.actvRoute.snapshot.data['data'])
      this.username = this.actvRoute.snapshot.data['data'];
    else
      this.username = getAuth();
    
      console.log(this.actvRoute.snapshot.data['data']);
      

    this.profileDetail();
  }

  private async profileDetail() {
    const response = await axios.get(`${SERVER_API}/user/profile.php?username=${this.username}`);
    const { profile, gallery, encode } = response.data;

    this.profile = profile;
    this.gallery = gallery;
    this.encode = new Array<object>();

    encode.map((enc: object, index: number) => {
      let base64 = "data:image/png;base64,";
      let final = base64 + enc;
      this.encode.push({
        idposting: gallery[index].idposting,
        encode: final
      });
    })

    this.loading = false;
  }

  async showProfileOption(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfileOptionComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  async detailPost(id: any) {
    console.log(id);

  }

  likeChange(event: any) {
    console.log(event.target.value);
  }
}
