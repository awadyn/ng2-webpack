import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProceduresComponent } from './procedures.component';
import { ProcedureDetailComponent } from './procedure-detail.component';

import { ProceduresBackendService } from './proceduresBackend.service';
import { ProceduresStore } from './proceduresStore';

import { ProceduresRoutingModule } from './procedures-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BackendSmartTableModule } from './backend-smart-table/backend-smart-table.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProceduresRoutingModule,
        Ng2SmartTableModule,
        BackendSmartTableModule
    ],
    exports: [
        ProceduresComponent,
        ProcedureDetailComponent
    ],
    declarations: [
        ProceduresComponent,
        ProcedureDetailComponent
    ],
    providers: [
        ProceduresBackendService,
        ProceduresStore
    ]
})

export class ProceduresModule { }
