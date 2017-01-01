/*
 * ProcedureBackendService: http backend for observable data store
 *
 * no state is managed here
 *
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Procedure } from 'app/procedure';

@Injectable()
export class ProceduresBackendService {

    private proceduresUrl = 'app/procedures';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http) { }

    /*
     *  fetch procedures as a stream from mock db
     */
    getProcedures() {
        return this.http.get(this.proceduresUrl)
                   .catch(this.handleError);
    }

    /**
     *  adds procedure to mock db
     *  response body is object representation of added procedure
     *  new procedure id set through auto-increment
     */
    addProcedure(first_name:string, last_name:string, email:string, gender:string, birthday:string, phone: number, zip:number, hsr: boolean, notes:string) {
        return this.http
                           .post(this.proceduresUrl, JSON.stringify({first_name:first_name, last_name:last_name, email:email, gender:gender, birthday:birthday, phone:phone, zip:zip, hsr:hsr, notes:notes}), {headers:this.headers})
                           .catch(this.handleError);
    }

    /**
     *  @param id: id of procedure to delete
     *  deletes procedure from mock db
     *  response body is null => do not call json() on response
     */
    deleteProcedure(id: number) {
        const url = `${this.proceduresUrl}/${id}`;
        return this.http
                   .delete(url)
                   .catch(this.handleError);
    }

    /**
     *  @param procedure: procedure to save changes to
     *  saves changes to procedure in mock db
     *  response body is null => do not call json() on response
     */
    saveProcedure(procedure?: Procedure) {
        if (procedure) {
            const url = `${this.proceduresUrl}/${procedure.id}`;
            return this.http
                .put(url, JSON.stringify(procedure), {headers:this.headers})
                .catch(this.handleError);
        } else {
            console.log('cannot save procedure... procedure undefined or null');
            return;
        } 
    }

    /*
     *  handle errors from http requests
     */
    handleError(error: any): Promise<any> {
        console.error('An error occured, ', error);
        return Promise.reject(error.message || error);
    }
}

