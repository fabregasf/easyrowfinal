import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, Platform  } from 'ionic-angular';

import { Client } from '../../interfaces/client';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private object: Client;
  private current_password: number;
  private queue: Array<Object> = [];
  timerInterval: any;
  lastChecked: Date;
  secondsElapsed: number = 0;
  now: any;
  hour: number = 0;
  min: number = 0;
  seconds: number = 0;
  message: any;
  uuid: any;

  constructor(
    private navParams: NavParams,
    private db: FirestoreProvider,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
  	private platform: Platform
  ) {

	  this.platform.registerBackButtonAction(() => {
      //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess.
      //just breathe, and have faith that everything will work out for the best.
    },1);

    // Recebe o parametro ao abrir o modal
    this.object = this.navParams.get('data');

    // Busca todas as senhas do lugar
    this.db.getQueue(this.object.place.id).subscribe(data => {

      // Filtra os dados, buscando qual esta sendo atendida
      this.queue = data.filter((x:any) => x.date < this.object.date)
      let result:any = data.filter((x:any) => x.in_attendance == true)

      // Seta senha atual chamada
      if (result.length) {
        this.current_password = result[0].password
      }

      // if(this.current_password == this.object.password){
        //this.startTiming(); // começa a contagem do tempo
      // }
    })
  }

  // Abre detalhes da empresa
  abreDetalhe(){
	  this.alertCtrl.create({
      title: 'Detalhes da empresa',
      message: '<p>Nome ;;;</p>',
      buttons: [
        { text: 'OK', role: 'cancel' },
      ],
      cssClass: 'alertCustomCss'
    }).present();
  }

  close(){
    // Exibe alerta
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        title: 'Confirmacao',
        message: '<p class="texto">Confirma sua saída da fila?</p>',
        buttons: [
          { text: 'Não', role: 'cancel' },
          {
            text: 'Sim',
            handler: () => {
              // Remove a senha
              this.db.removeUser(this.object.key);
              // Fecha o modal
              this.viewCtrl.dismiss().then(() => reject());
            }
          }
        ],
        cssClass: 'alertCustomCss'
      }).present();
    });
  }


  startTiming(): void {
    this.lastChecked = new Date("00:00:00"); // começando da hora 0, minuto 0, segundo 0

    this.timerInterval = setInterval(() => {
      this.now = new Date();
      this.hour = this.now.getHours();
      this.min = this.now.getMinutes();
      this.seconds = this.now.getSeconds();

      let timeDifference = this.now.getTime() - this.lastChecked.getTime();
      let seconds = timeDifference / 1000;

      this.secondsElapsed += seconds;

      this.lastChecked = this.now;
    }, 1000);
  }
}
