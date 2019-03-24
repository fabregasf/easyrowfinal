import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingProvider {

    loading: Loading;

    constructor(public loadingCtrl: LoadingController) {
  	// console.log('Hello LoadingProvider Provider');
    }
    
    presentLoader() {
        this.loading = this.loadingCtrl.create({
          content: 'Carregando ...'
        });

        return this.loading.present();
    }

    loaderSemCaixa(){
          this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `
        <div class="spinner2">
          <img class="loading" width="120px" height="120px" src="assets/imgs/spinner-loop.gif" />
        </div>`
      });

      return this.loading.present();
    }

    dismiss() {
      this.loading.dismiss()
    }
}
