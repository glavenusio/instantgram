import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileOptionComponent } from './popover/profile-option/profile-option.component';
import { Camera } from '@ionic-native/camera/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, ProfileOptionComponent],
  entryComponents: [ProfileOptionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    // ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
