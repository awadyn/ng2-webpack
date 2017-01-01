import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { BackendSmartTableComponent } from './backend-smart-table.component';

@NgModule({
    imports: [
        Ng2SmartTableModule
    ],
    exports: [
        BackendSmartTableComponent
    ],
    declarations: [
        BackendSmartTableComponent
    ],
    providers: [
    ]
})

export class BackendSmartTableModule { }
