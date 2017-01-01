/**
 * child component
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UsableContent } from '../../../usable-content/usable-content';

import { ContentStore } from '../contentStore';



@Component({
    selector: 'composite-content',
    templateUrl: './composite-content.html'
})

/**
 *  defines any properties or methods that this component will be using
 */
export class CompositeContent { 

    @Output() onSelected = new EventEmitter<UsableContent>();

    /**
     *  @constructor
     *  @param _store: model-view controller; contains local state and control functions
     */
    constructor(private _store: ContentStore) {
    }


    /**
     *  notify parent that a basic content has been selected
     */
    onSelect(selected_content: UsableContent) {
        console.log('Selected ', selected_content);
        this.onSelected.emit(selected_content);
    }
}
