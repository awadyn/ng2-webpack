/**
 *  service to communicate with the backend for Tiles page
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class UsableContentBackend {

    /**
     *  @constructor
     */
    constructor(private http: Http) { }



    /**
     *
     */
    onSave() {
        console.log('Backend service onSave()...');
    }



    /**
     *
     */
    onDelete() {
        console.log('Backend service onDelete()...');
    }

}
