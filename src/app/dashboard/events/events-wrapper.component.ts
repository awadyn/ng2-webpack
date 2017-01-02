/**
 * Tiles page parent component
 */
import { Component } from '@angular/core';

import { UsableContentWrapper } from '../../usable-content/usable-content-wrapper.component';

import { UsableContentStore } from '../../usable-content/usableContentStore';

@Component({
    selector: 'events-wrapper',
    templateUrl: 'events-wrapper.html'
})

export class EventsWrapper extends UsableContentWrapper { 

    /**
     *  @constructor
     */
    constructor(_store: UsableContentStore) {
        super(_store);
    }
    


    /* event handlers ...*/
    
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
}
