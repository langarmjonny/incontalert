import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {DashboardService } from '../../../@core/data/dashboard.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {


  @Input() position = 'normal';
  user: any;
  interval:any;
  notis = []; 
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private service : DashboardService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.thomas);
    this.interval = setInterval(() => {this.receiveProgramInfo();} ,1000);
  }
  ngOnDestroy(){
    console.log("Ok");
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
  receiveProgramInfo(){
      this.service.sendData(["toaster_info", null ,null]).subscribe(res => {
            try{
              if(res == null){
                console.log("Keine Programmdaten erhalten");
              }
              else{

                let notifications = res["toaster"];
                notifications = notifications.slice(0).reverse();
                for(let n of  notifications)
                {
                  //Zeige alle Notifications an
                  this.showToast(n["type"], n["title"], n["text"]); 
                  this.notis.push({type: n["type"], title: n["title"],text: n["text"]});
                   if(this.notis.length >= 6)
                     this.notis.shift(); 
                }
              }
            } 
            catch(e)
            {
              console.log("Fehler beim Empfang der Toastdaten");
            } 
          });
    }
    private showToast(type: string, title: string, body: string) {
       
        const toast: Toast = {
          type: type,
          title: title,
          body: body,
          timeout:5000,
          showCloseButton: false,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      }

      clearToasts() {
        this.toasterService.clear();
      }
    

}
