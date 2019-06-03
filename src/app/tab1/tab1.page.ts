import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { SERVER_API, getAuth } from '../utils';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  profile: object;
  gallery: Array<any>;
  encode: Array<any>;
  loading: boolean;
  
  constructor() { }

  async ngOnInit() {
    const response = await axios.get(`${SERVER_API}/user/profile.php?username=${getAuth()}`);
    const { profile, gallery, encode } = response.data;

    this.profile = profile;
    this.gallery = gallery;
    this.encode = encode;

    this.loading = false;
  }

}
