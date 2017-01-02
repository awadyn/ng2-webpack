import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { UsableContent } from '../../usable-content/usable-content';

import { UsableContentStore } from '../../usable-content/usableContentStore';
import { UsableContentBackend } from '../../usable-content/usableContentBackend.service';


@Injectable()
export class EventsStore extends UsableContentStore {


    /**
     *  @constructor
     */
    constructor(_backendService: UsableContentBackend) {
        super(_backendService);   
    }




    /**
     *  OVERRIDE
     *  @return tile content
     *  create tile content given content_id
     *  NOTE: temporary function until DB calls can be made to get a composite content tecomposition
     */
    protected onCreateBasic(new_id: string) {
        let time = new Date();
        let new_content = new UsableContent('tile', new_id, {identifiers:{name:'new_created_tile', time_created:time}, timestamp:{}, composition:[new_id], other:{}});
        return new_content;
    }




    /**
     *  OVERRIDE
     *  @return event content
     *  create new event content
     *  @param new_id: id of new composite content
     *  new event content composition is list of id's of all selected tiles
     *  new event content identifiers, timestamp, and other data is specified through user input
     */
    protected onCreateComposite(new_id: string): UsableContent {
        /* assert that new_composite is not undefined */
        if (this._new_composite.getValue() === undefined) {
            alert('Error: Cannot create new composite content. New composite content is not initialized.');
            return;
            //TODO error handling
        }
        let time = new Date();
        let identifiers = {name: this._new_composite.getValue().getName(), time_created: time};
        let timestamp = {};
        let new_composition = this.getIds(this._selected_content);
        let other = {};
        let new_content = new UsableContent('event', new_id, {identifiers:identifiers, timestamp:timestamp, composition:new_composition, other:other});
        return new_content;
    }
    
    
    
    
    /**
     *  calls backend service to fetch content upon initializing store
     */
    protected loadInitialContent() {
        //TODO call backend service to fetch initial content
        //TODO remove temporary initial content
        var uuid_1 = UUID.UUID();
        var uuid_2 = UUID.UUID();
        var time_1 = new Date();
        var time_2;
        var temp_content_1 = new UsableContent('tile', uuid_1, {identifiers: {name:'tile_1', time_created:time_1}, timestamp:{}, composition:[uuid_1], other:{}});
        setTimeout(() => {
                time_2 = new Date();
                var temp_content_2 = new UsableContent('tile', uuid_2, {identifiers: {name:'tile_2', time_created:time_2}, timestamp:[], composition:[uuid_2], other:{}});
                this._basic_content.next([temp_content_1, temp_content_2]);
        }, 1000);
        console.log('loading initial content...');
        console.log('basic_content: ', this.basic_content);
        console.log('selected_content: ', this.selected_content);
        console.log('composite_content', this.composite_content);   
    }

}
