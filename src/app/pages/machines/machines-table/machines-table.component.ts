import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {MachinesTableService } from '../../../@core/data/machines-table.service';

@Component({
  selector: 'ngx-machines-table',
  templateUrl: './machines-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MachinesTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      machineName: {
        title: 'Name',
        type: 'string',
      },
      x: {
        title: 'X-Koordinate',
        type: 'number',
      },
      y: {
        title: 'Y-Koordinate',
        type: 'number',
      },
      phi: {
        title: 'Ausrichtung',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: MachinesTableService) {
    const data = service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
