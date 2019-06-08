import { Component } from '@angular/core';
import { SERVER_API, setLocalAuth, getAuth } from '../utils';

import axios from 'axios'
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  info: string;
  user = {
    username: '',
    password: ''
  };

  constructor(public router: Router, public events: Events) { }

  async login() {
    let { user } = this;

    if (user.username.length >= 1 && user.password.length >= 1) {
      let data = new FormData();
      data.append('username', user.username);
      data.append('password', user.password);

      try {
        const response = await axios.post(`${SERVER_API}/user/login.php`, data);
        const { status, credential } = response.data;

        if (status != 401) {
          this.info = '';
          setLocalAuth(credential.username);
          this.events.publish('user:login', getAuth(), Date.now())
          this.router.navigateByUrl('/tabs/profile');
        } else {
          this.info = 'error: autentikasi gagal'
          this.user.password = '';
        }
      } catch (e) {
        console.error(e);
        this.info = 'network error';
      }
    }
  }

}
