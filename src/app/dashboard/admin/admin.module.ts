/**
 * root module
 * entry point to application
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
    imports: [
            CommonModule,
            AdminRoutingModule
    ],
    exports: [
            AdminComponent
    ],
    declarations: [
            AdminComponent
    ]
})

export class AdminModule { }
