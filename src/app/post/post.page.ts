import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {

  data: any;

  constructor(private actvRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.actvRoute.snapshot.data['data']) {
      this.data = this.actvRoute.snapshot.data['data'];
    }
  }
}
