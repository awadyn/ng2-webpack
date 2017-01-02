import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { UsableContent } from './usable-content';



@Component({
    selector: 'selected-content',
    templateUrl: './selected-content.html'
})

export class SelectedContentComponent { 

    @Input() contentStream: Observable<UsableContent[]>;

    /**
     *  @constructor
     */
    constructor() {
    }


}
