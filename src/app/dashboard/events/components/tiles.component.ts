import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { UsableContent } from '../../../usable-content/usable-content';

import { UsableContentComponent } from '../../../usable-content/usable-content.component';

@Component({
    selector: 'tiles',
    templateUrl: '../../../usable-content/usable-content.html'
})

export class Tiles extends UsableContentComponent {

        @Input() contentStream: Observable<UsableContent[]>; 
        

        
        /**
         *  @constructor
         */
        constructor() {
            super();
            //TODO PASS BY VALUE?
            this.sortOptions = [{title: 'Time Created', identifier: 'time_created'}, {title: 'Name', identifier: 'name'}, {title: 'Category', identifier: 'category'}, {title: 'Author', identifier: 'author'}];
        }
}
