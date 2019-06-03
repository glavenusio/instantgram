import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/authentication';
import { DataServiceResolver } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/tab2', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'post/:id',
    resolve: {
      data: DataServiceResolver
    },
    loadChildren: './post/post.module#PostPageModule'
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule { }
