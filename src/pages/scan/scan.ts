import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Platform, LoadingController, ModalController } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { DetailPage } from '../detail/detail';
import { Client } from '../../interfaces/client';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  private data: any;

  constructor(
    private platform: Platform,
    private formatDate: DatePipe,
    private oneSignal: OneSignal,
    private db: FirestoreProvider,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    public meuLoader: LoadingProvider
  ) { }

  scanBar() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled) {
        this.data = barcodeData.text;
        this.meuLoader.presentLoader();
        this.setUser();
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  setUser(){
    const list_data = this.data.split('|');
    const now = new Date();

    const data: Client = {
      in_attendance: false,
      password: parseInt(list_data[2]),
      place: {
        id: list_data[1], // Id da empresa
        name: list_data[0], // Nome da empresa
        date_id: this.formatDate.transform(now, 'dd/MM/yyyy')+'__'+list_data[1],
        average_time: ''
      },
      uuid: '',
      date: this.formatDate.transform(now, 'dd/MM/yyyy HH:mm:ss')
    };

    if(this.platform.is('cordova')){
      this.oneSignal.getIds().then(user => {
        // Adiciona o uuid tambem nos dados
        data.uuid = user.userId;
        this.saveUser(data);
      })
    }else{
      this.saveUser(data);
    }
  }

  saveUser(data: Client){    
    this.meuLoader.dismiss();
    this.db.saveUser(data);
    this.goToResult(data);
  }

  goToResult(object: Client) {
    this.modalCtrl.create(DetailPage, {data: object}).present();
  }    
  

}
