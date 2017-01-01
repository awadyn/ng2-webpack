import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TilesComponent } from './tiles.component';
import { TilesRoutingModule } from './tiles-routing.module';

import { ContentStore } from './contentStore';
import { ContentBackendService } from './contentBackendService';

import { BasicContentModule } from './basic-content/basic-content.module';
import { SelectedContentModule } from './selected-content/selected-content.module';
import { CompositeContentModule } from './composite-content/composite-content.module';

@NgModule({
    imports: [
        CommonModule,
        TilesRoutingModule,
        BasicContentModule,
        SelectedContentModule,
        CompositeContentModule
    ],
    exports: [
        TilesComponent
    ],
    declarations: [
        TilesComponent
    ],
    providers: [
        ContentStore,
        ContentBackendService
    ]
})

export class TilesModule { }
