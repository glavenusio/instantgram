import { Component, OnInit } from '@angular/core';
import { destroyAuth } from '../../utils';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-option',
  templateUrl: './profile-option.component.html',
  styleUrls: ['./profile-option.component.scss'],
})

export class ProfileOptionComponent implements OnInit {

  constructor(public popoverController: PopoverController, public router: Router) { }

  ngOnInit() { }

  logout() {
    destroyAuth();
    this.popoverController.dismiss();
    this.router.navigateByUrl('/login');
  }
}
