import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { UsableContent } from './usable-content';

import { UsableContentThumbnail } from './components/usable-content-thumbnail.component';



interface sortOption {
    title: string;
    identifier: string;
}



@Component({
    selector: 'usable-content',
    templateUrl: './usable-content.html'
})

export class UsableContentComponent { 

    @Input() contentStream: Observable<UsableContent[]>;
    @Output() onSelected = new EventEmitter<UsableContent>();
    /*  sortOptions: defines sort options for this content stream
     *  a sort option is an object of format: {title:string, identifier:string}
     *  where title is the sort option that appears on the view
     *  and identifier is the content identifier by which to sort
     */
    protected sortOptions: sortOption[];

    
    /**
     *  @constructor
     */
    constructor() {
            this.sortOptions = [{title: 'Time Created', identifier:'time_created'}];
    }



    /**
     *
     */
    onSearch(search_term: string) {
        console.log('Usable Content onSearch()...');
    }

    

    /**
     *
     */
    onSort(sort_option: any) {
        console.log('Usable Content onSort()...');
        console.log('event emitted: ', sort_option);
    }



    /**
     *  notify parent that content has been selected
     */
    onSelect(selected_content: UsableContent) {
        console.log('Selected ', selected_content);
        this.onSelected.emit(selected_content);
    }
}
