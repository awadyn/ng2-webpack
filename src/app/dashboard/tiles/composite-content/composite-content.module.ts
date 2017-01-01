import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompositeContent } from './composite-content.component';
import { ContentStore } from '../contentStore';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CompositeContent
    ],
    declarations: [
        CompositeContent
    ],
    providers: [
        ContentStore
    ]
})

export class CompositeContentModule { }
