import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProceduresComponent } from './procedures.component';

const proceduresRoutes: Routes = [
    { path: "procedures", component: ProceduresComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(proceduresRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProceduresRoutingModule {  }

