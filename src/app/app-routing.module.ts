import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/authentication';
import { AlreadyAuthenticated } from './auth/already';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/profile', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AlreadyAuthenticated] },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService, AlreadyAuthenticated],
})
export class AppRoutingModule { }
