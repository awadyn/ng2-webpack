import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { UsableContent } from '../../../usable-content/usable-content';

import { SelectedContentComponent } from '../../../usable-content/selected-content.component';

@Component({
    selector: 'selected-tiles',
    template: ` <div>
                    <div *ngFor="let content of contentStream | async">
                        <tile [content]="content"></tile>
                    </div>
                </div>
              `
})

export class SelectedTiles extends SelectedContentComponent { 

    @Input() contentStream: Observable<UsableContent[]>;

}

