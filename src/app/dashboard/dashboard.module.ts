/**
 * root module
 * entry point to application
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
    imports: [
            CommonModule,
            DashboardRoutingModule
    ],
    exports: [
            DashboardComponent
    ],
    declarations: [
            DashboardComponent
    ]
})

export class DashboardModule { }
