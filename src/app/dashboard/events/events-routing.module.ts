import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsWrapper } from './events-wrapper.component';

const eventsRoutes: Routes = [
    { path: "events", component: EventsWrapper },
];

@NgModule({
    imports: [
        RouterModule.forChild(eventsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class EventsRoutingModule { }
