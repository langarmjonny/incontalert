import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachinesComponent } from './machines.component';
import { MachinesTableComponent } from './machines-table/machines-table.component';

const routes: Routes = [{
  path: '',
  component: MachinesComponent,
  children: [{
    path: 'machines-table',
    component: MachinesTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinesRoutingModule { }

export const routedComponents = [
  MachinesComponent,
  MachinesTableComponent,
];
