/**
 * Tiles page parent component
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsableContent } from '../../usable-content/usable-content';

import { ContentStore } from './contentStore';
//import { Content } from './content/content.component';
//import { SelectedContent } from './selected-content/selected-content.component';
//import { NewContent } from './new-content/new-content.component';


@Component({
    selector: 'tiles',
    templateUrl: './tiles.html'
})

/**
 *  defines any properties or methods that this component will be using
 */
export class TilesComponent { 

    /**
     *  @constructor
     *  @param _store: model-view controller; contains local state and control functions
     *  @param router
     */
    constructor(private _store: ContentStore, private _router: Router) {
    }



    /**
     *
     */
    onNameChange(name:string) {
        this._store.selected_composite.metadata.identifiers.name = name;
        this._store.setEdited(true);
    }


    /**
     *
     */
    onNameSet(name:string) {
       this._store.new_composite.metadata.identifiers.name = name;
       this._store.setEdited(true); 
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



    /**
     *  go back to dashboard
     */
    goBack(): void {
        this._router.navigate(['']);
    }
}
