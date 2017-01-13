import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  private PERFIL: number = 0;
  private HOME: number = 1;
  private GROUPS: number = 2;
  private CHAT: number = 3;

  private indexOfTab: number;

  constructor() {
    this.tab1Root = AboutPage;
    this.tab2Root = HomePage;
    this.tab3Root = ContactPage;

    this.indexOfTab = this.HOME;
  }

  callPageHome(){
    this.indexOfTab = this.HOME;
    this.tabRef.select(this.HOME);
  }

  callPagePerfil(){
    this.indexOfTab = this.PERFIL;
    this.tabRef.select(this.PERFIL);
  }

  callPageGroups(){
    this.indexOfTab = this.GROUPS;
    this.tabRef.select(this.GROUPS);
  }

  callPageChat(){
    //this.indexOfTab = this.CHAT;
    //this.tabRef.select(this.CHAT);
  }

}
