import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {DashboardService } from '../../../@core/data/dashboard.service';

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
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
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

  constructor(private service: DashboardService ) {
     this.service.sendData(["machine_read", null ,null]).subscribe(res => {
        try{
            this.source.load([res]);
          }
          catch(e)
          {
             console.log("Ortdaten fehlerhaft");
          }
      });
    }
  onDeleteConfirm(event): void {
    if (window.confirm('Bist du sicher, dass du löschen willst?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event){
    this.service.sendData(["machine_write", {"mode": "add", "value": event.newData} ,null]).subscribe();
  }
  onSaveConfirm(event) {
    console.log(event); 
    this.service.sendData(["machine_write", {"mode": "edit", "value": event.newData} ,null]).subscribe();
  }
}
