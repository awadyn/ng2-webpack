import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicContent } from './basic-content.component';
import { ContentStore } from '../contentStore';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BasicContent
    ],
    declarations: [
        BasicContent
    ],
    providers: [
        ContentStore
    ]
})

export class BasicContentModule { }
