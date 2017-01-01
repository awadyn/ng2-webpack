import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { OrganizationDetailComponent } from './organization-detail.component';

const organizationsRoutes: Routes = [
    { path: "organizations", component: OrganizationsComponent },
    { path: "organization/:name", component: OrganizationDetailComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(organizationsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OrganizationsRoutingModule {  }
