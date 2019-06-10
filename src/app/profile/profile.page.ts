import { Component, OnInit } from '@angular/core';
import { PopoverController, Events } from '@ionic/angular';
import axios from 'axios';
import { SERVER_API, getAuth, convertToFinalCollection } from '../utils';
import { ProfileOptionComponent } from '../popover/profile-option/profile-option.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  profile: any;
  encode: Array<object>;
  gallery: Array<object>;
  hideoption: boolean;
  nopost: boolean = false;

  constructor(public popoverController: PopoverController,
    private actvRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private events: Events) {
    // must subscribe event from user:login otherwise it's using cache 
    this.events.subscribe('user:login', (user) => {
      this.username = user;
      this.profileDetail();
    });
  }

  async ngOnInit() {
    if (this.actvRoute.snapshot.data['data'])
      this.username = this.actvRoute.snapshot.data['data'];
    else
      this.username = getAuth();

    this.profileDetail();
  }

  private async profileDetail() {
    const response = await axios.get(`${SERVER_API}/user/profile.php?username=${this.username}`);
    const { profile, uris, gallery } = response.data;
    
    this.profile = profile;
    this.gallery = gallery;
    this.encode = convertToFinalCollection(uris, gallery);

    this.hideoption = this.username != getAuth() ? true : false;

    if (this.encode.length <= 0) this.nopost = true;
  }

  async showProfileOption(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfileOptionComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }
  getMeta(url: any){   
    var img = new Image();
    img.src = url;
    return img;
  }

  async detailPost(selectedItem: any) {
    // this.events.publish('post:height', this.getMeta(selectedItem.src).height);
    localStorage.setItem('maxpotrait', this.getMeta(selectedItem.src).height > 1000 ? 'true' : 'false')

    const passData = {
      id: selectedItem.idposting,
      username: this.profile.username,
    }

    this.dataService.setData(
      selectedItem.idposting, // key
      passData // data
    );

    this.router.navigateByUrl(`/tabs/post/${selectedItem.idposting}`);
  }

}
