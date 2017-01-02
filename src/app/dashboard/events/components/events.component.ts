import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { UsableContent } from '../../../usable-content/usable-content';

import { UsableContentComponent } from '../../../usable-content/usable-content.component';

@Component({
    selector: 'events',
    templateUrl: '../../../usable-content/usable-content.html'
})

export class Events extends UsableContentComponent {

        @Input() contentStream: Observable<UsableContent[]>; 
        @Output() onSelected = new EventEmitter<UsableContent>();
        

        
        /**
         *  @constructor
         */
        constructor() {
            super();
            //TODO PASS BY VALUE?
            this.sortOptions = [{title: 'Time Created', identifier: 'time_created'}, {title: 'Name', identifier: 'name'}, {title: 'Type', identifier: 'type'}];
        }
}

