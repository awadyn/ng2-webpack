import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudioUsersComponent } from './studio-users.component';
import { UserDetailComponent } from './user-detail.component';

const studioUsersRoutes: Routes = [
    { path: "studio-users", component: StudioUsersComponent },
    { path: "user/:pin", component: UserDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(studioUsersRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class StudioUsersRoutingModule {  }
