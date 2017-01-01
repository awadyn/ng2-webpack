/**
 *  routing module
 *  refactor routing configurations
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';

const appRoutes: Routes = [
    { path: "welcome", component: WelcomeComponent },
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    { path: "**", redirectTo: "welcome" }            
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
