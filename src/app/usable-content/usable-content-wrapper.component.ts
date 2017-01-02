/**
 * Usable content and Selected content parent component
 */
import { Component } from '@angular/core';

import { UsableContent } from './usable-content';
import { UsableContentComponent } from './usable-content.component';
import { SelectedContentComponent } from './selected-content.component';

import { UsableContentStore } from './usableContentStore';



@Component({
    selector: 'usable-content-wrapper',
    templateUrl: './usable-content-wrapper.html'
})

export class UsableContentWrapper { 

    /**
     *  @constructor
     *  @param _store: model-view controller; manages local state and control functions
     */
    constructor(protected _store: UsableContentStore) {
    }



    /**
     *  handles event emitted from child component
     *  updates local state: pushes content selected from usable_content to selected_contend
     */
    onSelected(selected_content: UsableContent) {
        console.log('Parent calling store onSelect...');
        this._store.onSelect(selected_content);
    }



    /**
     *  calls store saving function
     */
    onSave() {
        console.log('Parent calling store onSave...');
        this._store.onSave();
    }



    /**
     *
     */
    onNew() {
        console.log('Parent calling store onNew...');
        this._store.onNew();
    }



    /**
     *
     */
    onDelete() {
        console.log('Parent calling store onDelete...');
        this._store.onDelete();
    }

}
