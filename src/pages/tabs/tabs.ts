import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { ScanPage } from '../scan/scan';
import { AboutPage } from '../about/about';
import { HistoricPage } from '../historic/historic';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = ScanPage;
  tab2Root = HistoricPage;
  tab3Root = AboutPage;

  constructor(
  ) { }
}
