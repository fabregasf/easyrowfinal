import { Component, enableProdMode } from '@angular/core';
import { Platform, ModalController, AlertController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from './../pages/tabs/tabs';
import { Client } from '../interfaces/client';
import { DetailPage } from './../pages/detail/detail';
import { FirestoreProvider } from '../providers/firestore/firestore';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;
  showSplash = true; // <-- show animation

  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    private statusBar: StatusBar,
    private db: FirestoreProvider,
    private splashScreen: SplashScreen,
    private modalCtrl: ModalController,    
    private alertCtrl: AlertController
  ) {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
        this.oneSignal.startInit('8bb775b8-e31c-43b8-b3d7-b4a9645c9d5c');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          let params = data.notification.payload.additionalData
          if (params && params.key) {
            this.db.getUser(params.key).subscribe(data => {
              const obj: Client = data;
              this.modalCtrl.create(DetailPage, {data: obj}).present();
            })
          }
        });

        this.oneSignal.endInit();
      }
    });   


  }
}

