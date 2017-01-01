import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudioUsersComponent } from './studio-users.component';
import { UserDetailComponent } from './user-detail.component';

import { StudioUsersBackendService } from './studioUsersBackend.service';
import { StudioUsersStore } from './studioUsersStore';

import { StudioUsersRoutingModule } from './studio-users-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StudioUsersRoutingModule
    ],
    exports: [
        StudioUsersComponent,
        UserDetailComponent
    ],
    declarations: [
        StudioUsersComponent,
        UserDetailComponent
    ],
    providers: [
        StudioUsersBackendService,
        StudioUsersStore
    ]
})

export class StudioUsersModule { }
