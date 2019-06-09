import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  mediapreview: any;
  lensoptions: CameraOptions;
  erinfo: string;
  caption: string;

  constructor(private camera: Camera, private imagePicker: ImagePicker) {
    this.lensoptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
  }

  ngOnInit() {
  }

  async openCamera() {
    this.camera.getPicture(this.lensoptions).then(async (imageData) => {
      this.mediapreview = `data:image/png;base64,${imageData}`;
    }, (err) => {
      // Handle error
    });

  }

  openGallery() {
    this.imagePicker.getPictures(this.lensoptions).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      this.erinfo = JSON.stringify(err);
    });

  }
}
