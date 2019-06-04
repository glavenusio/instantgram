import { Component } from '@angular/core';
import axios from 'axios'
import { SERVER_API, getAuth } from '../utils';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  result: Array<object> = new Array<object>();

  constructor(private service: DataService, private router: Router) { }

  async find(e: any) {
    if(e.target.value.length > 0){
      const response = await axios.get(`${SERVER_API}/user/search.php?username=${e.target.value}&as=${getAuth()}`)
      const { result } = response.data
      this.result = result
    }
  }

  goToProfileOf(username: string) {
    this.service.setData(username, username);
    this.router.navigateByUrl(`/tabs/profile/${username}`)
  }

}
