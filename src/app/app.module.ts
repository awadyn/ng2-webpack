/**
 * root module
 * entry point to application
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';

import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './dashboard/admin/admin.module';
import { StudioUsersModule } from './dashboard/admin/studio-users/studio-users.module';
import { OrganizationsModule } from './dashboard/admin/organizations/organizations.module';
import { ProceduresModule } from './dashboard/admin/procedure-mappings/procedures.module';
import { TilesModule } from './dashboard/tiles/tiles.module';


//import { UsableContentModule } from './usable-content/usable-content.module';
import { EventsModule } from './dashboard/events/events.module';


import { BasicContentModule } from './dashboard/tiles/basic-content/basic-content.module';
import { SelectedContentModule } from './dashboard/tiles/selected-content/selected-content.module';
import { CompositeContentModule } from './dashboard/tiles/composite-content/composite-content.module';
 

import { BackendSmartTableModule } from './dashboard/admin/procedure-mappings/backend-smart-table/backend-smart-table.module';

@NgModule({
    imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            InMemoryWebApiModule.forRoot(InMemoryDataService),
            DashboardModule,
            AdminModule,
            StudioUsersModule,
            OrganizationsModule,
            ProceduresModule,
            TilesModule,

//            UsableContentModule,
            EventsModule,

            BasicContentModule,
            SelectedContentModule,
            CompositeContentModule,
            AppRoutingModule,
            BackendSmartTableModule
    ],
    declarations: [
            AppComponent,
            WelcomeComponent
    ],
    /**
     * AppComponent: the main application view that hosts all other views
     */
    bootstrap: [AppComponent]
})

export class AppModule { }
