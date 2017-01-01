/**
 * child component
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContentStore } from '../contentStore';



@Component({
    selector: 'selected-content',
    templateUrl: './selected-content.html'
})

/**
 *  defines any properties or methods that this component will be using
 */
export class SelectedContent { 

    /**
     *  @constructor
     *  @param _store: model-view controller; contains local state and control functions
     */
    constructor(private _store: ContentStore) {
    }


}
