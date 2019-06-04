import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { SERVER_API, setLocalAuth } from '../utils';

import axios from 'axios'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  info: string;
  private user = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  async login() {
    let { user, router } = this;

    if (user.username.length >= 1 && user.password.length >= 1) {
      let data = new FormData();
      data.append('username', user.username);
      data.append('password', user.password);

      try {
        const response = await axios.post(`${SERVER_API}/user/login.php`, data);
        const { status, credential } = response.data;

        if (status != 401) {
          setLocalAuth(credential.username)
          
          router.navigateByUrl('/tabs/profile');
        } else {
          this.info = 'error: autentikasi gagal'
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

}
