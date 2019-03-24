import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { DetailPage } from '../detail/detail';
import { Client } from '../../interfaces/client';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html',
})
export class HistoricPage {

  private object_list: Observable<Object[]>;

  constructor(
    private db: FirestoreProvider,
    private modalCtrl: ModalController,
    private formatDate: DatePipe
  ) {
    this.object_list = this.db.getAllUsers()


    }

  // Abrir detalhes da empresa
  open(object: Client){
    this.modalCtrl.create(DetailPage, {data: object}).present()
  }
}
