import { Component, Input } from '@angular/core';

import { UsableContent } from '../usable-content';


@Component({
    selector: 'tile',
    template:   `
                    <div>
                        <ul>
                            <li>{{content.type}}</li>
                            <li>{{content.id}}</li>
                            <li>{{content.metadata.identifiers.time_created}}</li>
                        </ul>
                    </div>
                `
})

export class Tile {

        @Input() content: UsableContent;
}
