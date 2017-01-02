import { Component, Input } from '@angular/core';



@Component({
    selector: 'usable-content-thumbnail',
    templateUrl: './usable-content-thumbnail.html'
})

export class UsableContentThumbnail {

        @Input() title: string = '';
        @Input() image: string = '';

        /**
         *  @constructor
         */
        constructor() { 
            if (this.title === undefined)
                    this.title = '';
            if (this.image === undefined)
                    this.image = '';
        }
}

