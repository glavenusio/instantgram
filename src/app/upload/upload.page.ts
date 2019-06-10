import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { getAuth, SERVER_API } from '../utils';
import axios from 'axios';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  lensoptions: CameraOptions;
  erinfo: string;
  caption: string;
  collection: Array<string>;
  slideOpts: object;

  constructor(private camera: Camera, private router: Router, private events: Events) {
    this.lensoptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
    
    this.slideOpts = {
      zoom: false,
    }
  }

  ngOnInit() {
    this.collection = new Array();
  }

  openCamera() {
    this.camera.getPicture(this.lensoptions).then(async (imageData) => {
      this.collection.push(`data:image/png;base64,${imageData}`);
    }, (err) => { });
  }

  openGallery(){
    let galleryOpt: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }

    this.camera.getPicture(galleryOpt).then(async (imageData) => {
      this.collection.push(`data:image/png;base64,${imageData}`);
    }, (err) => { });
  }

  cancel(){
    this.collection = new Array();
    this.caption = ''; 
  }

  async publish() {
    let data = new FormData();
    for (const item of this.collection) {
      data.append(`images[]`, item);
    }

    data.append('username', getAuth());
    data.append('caption', this.caption);

    try {
      await axios.post(`${SERVER_API}/post/store.php`, data)
      this.router.navigateByUrl('/tabs/profile')
      this.events.publish('user:login', getAuth(), Date.now())
      this.collection = new Array();
    } catch (e) {
      this.erinfo = JSON.stringify(e)
    }
  }
}
