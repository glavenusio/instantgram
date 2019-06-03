import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import axios from 'axios';
import { SERVER_API, getAuth } from '../utils';
import { ProfileOptionComponent } from '../profile-option/profile-option.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: object;
  gallery: Array<any>;
  encode: Array<any>;
  loading: boolean;

  constructor(public popoverController: PopoverController) { }

  async ngOnInit() {
    const response = await axios.get(`${SERVER_API}/user/profile.php?username=${getAuth()}`);
    const { profile, gallery, encode } = response.data;

    this.profile = profile;
    this.gallery = gallery;
    this.encode = encode;

    this.loading = false;
  }

  async showProfileOption(ev: any){
        const popover = await this.popoverController.create({
      component: ProfileOptionComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
    
  }
}
