import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { SERVER_API, getAuth, convertCollectionToBase64PNG } from '../utils';
import { Location } from '@angular/common'

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {

  data: any;
  post: any;
  likes: string;
  _likes: number = 1;
  liked: boolean = false;
  comments: any;
  newcomment: string;
  allowremove: boolean;

  constructor(private actvRoute: ActivatedRoute, private location: Location) { }

  async ngOnInit() {
    if (this.actvRoute.snapshot.data['data']) {
      const data = this.actvRoute.snapshot.data['data'];
      const response = await axios.get(`${SERVER_API}/post/show.php?username=${data.username}&idposting=${data.idposting}`)
      const { likes, liked, img_previews, post_info, comments } = response.data

      this.allowremove = data.username == getAuth() ? true : false;
      
      this.data = convertCollectionToBase64PNG(img_previews);
      this.setLike(likes, liked);
      this.liked = liked;
      this.post = post_info;
      this.comments = comments;

    } else {
      this.backToProfile();
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

  private setLike(likes: number, liked: boolean) {
    this.liked = liked;
    this._likes = likes;
    this.likes = this._likes > 1 ? `${this._likes} likes` : `${this._likes} like`;
  }

  private backToProfile() {
    this.location.back();
  }
}
