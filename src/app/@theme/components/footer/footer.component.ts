import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by Nicolas Ruhland 2018</span>
    <div class="socials">
      <a href="http://192.168.0.120" target="_blank" class="ion ion-android-exit"></a>
    </div>
  `,
})
export class FooterComponent {
}
