import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TilesComponent } from './tiles.component';

const tilesRoutes: Routes = [
    { path: "tiles", component: TilesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(tilesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TilesRoutingModule { }
