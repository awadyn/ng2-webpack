import { Component } from '@angular/core';

import { UsableContentWrapper } from '../../usable-content/usable-content-wrapper.component';

import { UsableContent } from '../../usable-content/usable-content';
import { UsableContentStore } from '../../usable-content/usableContentStore';
import { EventsStore } from './eventsStore';



@Component({
    selector: 'events-wrapper',
    templateUrl: 'events-wrapper.html'
})

export class EventsWrapper extends UsableContentWrapper { 

    /**
     *  @constructor
     */
    constructor(_store: EventsStore) {
        super(_store);
    }
    


    /* event handlers ...*/
    
    /**
     *  OVERRIDE
     *  handles event emitted from child component
     *  updates local state: pushes content selected from usable_content to selected_contend
     */
    onSelected(selected_content: UsableContent) {
        console.log('Parent calling store onSelect...');
        if (selected_content.getType() === "tile")
                this._store.onSelectBasic(selected_content);
        else
                if (selected_content.getType() === "event")
                        this._store.onSelectComposite(selected_content);
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
}
