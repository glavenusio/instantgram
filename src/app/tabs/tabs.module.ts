import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { DataServiceResolver } from '../resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: '../search/search.module#SearchPageModule'
      },
      {
        path: 'post/:id',
        resolve: {
          data: DataServiceResolver
        },
        loadChildren: '../post/post.module#PostPageModule' 
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'profile/:id',
        resolve: {
          data: DataServiceResolver
        },
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
