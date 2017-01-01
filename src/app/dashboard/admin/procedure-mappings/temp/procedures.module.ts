import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProceduresComponent } from './procedures.component';
import { ProceduresService } from './procedures.service';
import { ProceduresRoutingModule } from './procedures-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProceduresRoutingModule,
        Ng2SmartTableModule
    ],
    exports: [
        ProceduresComponent
    ],
    declarations: [
        ProceduresComponent
    ],
    providers: [
        ProceduresService
    ]
})

export class ProceduresModule { }

