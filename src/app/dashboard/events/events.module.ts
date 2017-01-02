import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsableContentModule } from '../../usable-content/usable-content.module';
import { UsableContentStore } from '../../usable-content/usableContentStore';
import { UsableContentBackend } from '../../usable-content/usableContentBackend.service';

import { EventsWrapper } from './events-wrapper.component';
import { EventsRoutingModule } from './events-routing.module';

import { Tiles } from './components/tiles.component';



@NgModule({
    imports: [
        CommonModule,
        UsableContentModule,
        EventsRoutingModule,
    ],
    exports: [
        EventsWrapper,
        Tiles
    ],
    declarations: [
        EventsWrapper,
        Tiles
    ],
    providers: [
        UsableContentStore,
        UsableContentBackend
    ]
})

export class EventsModule { }
