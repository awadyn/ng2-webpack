/**
 *  service to communicate with the backend for Tiles page
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ContentBackendService {

    /**
     *  @constructor
     */
    constructor(private http: Http) { }

}
