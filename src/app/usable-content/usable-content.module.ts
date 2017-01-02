import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsableContentWrapper } from './usable-content-wrapper.component';
import { UsableContentComponent } from './usable-content.component';
import { SelectedContentComponent } from './selected-content.component';

import { UsableContentThumbnail } from './components/usable-content-thumbnail.component';
import { Tile } from './components/tile.component';

import { UsableContentStore } from './usableContentStore';
import { UsableContentBackend } from './usableContentBackend.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        UsableContentWrapper,
        UsableContentComponent,
        SelectedContentComponent,
        UsableContentThumbnail,
        Tile
    ],
    declarations: [
        UsableContentWrapper,
        UsableContentComponent,
        SelectedContentComponent,
        UsableContentThumbnail,
        Tile
    ],
    providers: [
        UsableContentStore,
        UsableContentBackend
    ]
})

export class UsableContentModule { }

