import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ManualInputComponent } from './manual-input/manual-input.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { LocalDataSource } from 'ng2-smart-table';

import {MachinesTableService } from '../../@core/data/machines-table.service';
import { GrabSettingsComponent } from './grab-settings/grab-settings.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ManualInputComponent,
    NavigationButtonsComponent,
    GrabSettingsComponent,
  ],
   providers: [
    MachinesTableService,
  ],
})
export class DashboardModule { }
