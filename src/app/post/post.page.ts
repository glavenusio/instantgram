import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { SERVER_API, getAuth, convertToFinalCollection } from '../utils';
import { Location } from '@angular/common'
import * as moment from 'moment'
import { Events, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit, OnDestroy {

  data: any;
  post: any;
  likes: string;
  count: number = 0;
  _likes: number = 1;
  liked: boolean = false;
  comments: any;
  newcomment: string;
  doslide: boolean;
  slideOpts: object;
  allowed: boolean;
  maxpotrait: boolean;

  constructor(private actvRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router, private location: Location, private events: Events) {
    this.slideOpts = {
      zoom: false,
    }
    this.maxpotrait = localStorage.getItem('maxpotrait') === 'true';
  }

  async ngOnInit() {
    if (this.actvRoute.snapshot.data['data']) {
      const data = this.actvRoute.snapshot.data['data'];
      this.detailPost(data.username, data.id);
      localStorage.setItem('tmp_postby', data.username);
    } else {
      this.detailPost(localStorage.getItem('tmp_postby'), this.actvRoute.snapshot.params.id)
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('tmp_postby');
    localStorage.removeItem('maxpotrait');
  }

  async deletePost() {
    const alert = await this.alertController.create({
      header: 'Delete Post',
      message: 'Post will delete permanently',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Okay',
          cssClass: 'danger',
          handler: async () => {
            await axios.get(`${SERVER_API}/post/delete.php?username=${getAuth()}&idposting=${this.post.idposting}`);
            this.router.navigateByUrl('/tabs/profile');
            this.events.publish('user:login', getAuth(), Date.now())
          }
        }
      ]
    });

    await alert.present();
  }

  async detailPost(by: string, postid: any) {
    try {
      const response = await axios.get(`${SERVER_API}/post/show.php?username=${by}&idposting=${postid}&on=${getAuth()}`)
      const { likes, liked, img_previews, post_info, comments } = response.data

      this.data = convertToFinalCollection(img_previews);
      this.setLike(likes, liked);

      this.post = post_info;
      this.post.tanggal = moment(this.post.tanggal, "YYYYMMDD").fromNow();

      this.allowed = this.post.username != getAuth() ? false : true;
      this.maxpotrait = localStorage.getItem('maxpotrait') === 'true';

      this.comments = comments;
      this.doslide = this.data.length > 1 ? true : false;
    }
    catch (e) {
      this.backToPrevious()
    }
  }

  async thumbsup() {
    let data = new FormData();
    data.append('idposting', this.post.idposting);
    data.append('username', getAuth());

    const response = await axios.post(`${SERVER_API}/like/thumbs.php`, data)
    this.setLike(response.data.likes, response.data.liked)
  }

  async addComment() {
    let data = new FormData();
    data.append('idposting', this.post.idposting);
    data.append('username', getAuth());
    data.append('isi_komen', this.newcomment);

    try {
      const response = await axios.post(`${SERVER_API}/comment/store.php`, data);
      this.comments = response.data.comments;
      this.newcomment = '';
    } catch (e) {
      console.error("error saat menambahkan komentar", e);
    }
  }

  setLike(likes: number, liked: boolean) {
    this.liked = liked;
    this._likes = likes;
    this.likes = this._likes > 1 ? `${this._likes} likes` : `${this._likes} like`;
  }

  async doubleTapLike(e: any) {
    if (e.tapCount == 2) await this.thumbsup();
    else return;
  }

  backToPrevious() {
    this.location.back();
  }
}
