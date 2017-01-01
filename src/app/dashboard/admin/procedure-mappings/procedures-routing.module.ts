import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProceduresComponent } from './procedures.component';
import { ProcedureDetailComponent } from './procedure-detail.component';

const proceduresRoutes: Routes = [
    { path: "procedures", component: ProceduresComponent },
    { path: "procedure/:name", component: ProcedureDetailComponent}
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
