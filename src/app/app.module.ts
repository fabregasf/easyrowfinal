import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { TabsPage } from './../pages/tabs/tabs';
import { ScanPage } from './../pages/scan/scan';
import { AboutPage } from './../pages/about/about';
import { DetailPage } from './../pages/detail/detail';
import { HistoricPage } from './../pages/historic/historic';

import { ReversePipe } from '../pipes/reverse/reverse';
import { firebaseConfig } from './credenciais/credenciais';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { LoadingProvider } from '../providers/loading/loading';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    MyApp,
    ScanPage,
    TabsPage,
    AboutPage,
    DetailPage,
    HistoricPage,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScanPage,
    TabsPage,
    AboutPage,
    DetailPage,
    HistoricPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    DatePipe,
    OneSignal,
    BarcodeScanner,
    FirestoreProvider,
    LoadingProvider,
    HttpModule
  ]
})
export class AppModule {}
