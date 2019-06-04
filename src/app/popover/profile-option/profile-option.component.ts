import { Component, OnInit } from '@angular/core';
import { destroyAuth } from '../../utils';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-option',
  templateUrl: './profile-option.component.html',
  styleUrls: ['./profile-option.component.scss'],
})
export class ProfileOptionComponent implements OnInit {

  constructor(private router: Router, public popoverController: PopoverController) { }

  ngOnInit() {}

  logout(){
    destroyAuth();
    this.popoverController.dismiss();
    location.href = '/login';
  }
}
