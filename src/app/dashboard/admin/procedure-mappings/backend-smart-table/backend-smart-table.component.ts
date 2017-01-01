/**
 *  ng2-smart-table with backend support
 */
import { Component, Input } from '@angular/core';

import { Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
    selector: 'backend-smart-table',
    templateUrl: `<h3>backend smart table component</h3>`
})

export class BackendSmartTableComponent extends Ng2SmartTableComponent {
    @Input() source: any;
    @Input() settings: Object = {};
    
    /**
     *
     */
    constructor() {
        super();
        console.log('Backend smart table component instance...');
    }


}
