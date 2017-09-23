import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TopPage } from '../pages/top/top';
import { AccountPage } from '../pages/account/account';
import { SupportPage } from '../pages/support/support';
import { TutorialPage } from '../pages/tutorial/tutorial';

export interface PageInterface {
title: string;
name: string;
component: any;
icon: string;
logsOut?: boolean;
index?: number;
tabName?: string;
tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
   rootPage:any = TopPage;

  appPages: PageInterface[] = [
    { title: 'アカウント情報', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: '各種設定', name: 'SupportPage', component: SupportPage, icon: 'information-circle'  }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.navCtrl.getActiveChildNavs().length && page.index != undefined) {
      this.navCtrl.getActiveChildNavs()[0].select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.navCtrl.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }


  openAccount() {
    this.navCtrl.setRoot(AccountPage);
  }

  openSupport() {
    this.navCtrl.setRoot(SupportPage);
  }

  openTutorial() {
    this.navCtrl.setRoot(TutorialPage);
  }

  isActive(page: PageInterface) {
    let childNav = this.navCtrl.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.navCtrl.getActive() && this.navCtrl.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
