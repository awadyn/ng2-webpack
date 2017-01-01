import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedContent } from './selected-content.component';
import { ContentStore } from '../contentStore';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SelectedContent
    ],
    declarations: [
        SelectedContent
    ],
    providers: [
        ContentStore
    ]
})

export class SelectedContentModule { }
