/*
 * OrganizationBackendService: http backend for observable data store
 *
 * no state is managed here
 *
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Organization } from 'app/organization';

@Injectable()
export class OrganizationsBackendService {

    private orgsUrl = 'app/orgs';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http) { }

    /*
     *  fetch organizations as a stream from mock db
     */
    getOrganizations() {
        return this.http.get(this.orgsUrl)
                   .catch(this.handleError);
    }

    /**
     *  @param org_name: name of organization to add
     *  @param org_type: type of organization to add
     *  @param org_package: package of organization to add
     *  adds organization to mock db
     *  response body is object representation of added organization
     *  new organization id set through auto-increment
     */
    addOrganization(org_name: string, org_type:string, org_package:string) {
        return this.http
                   .post(this.orgsUrl, JSON.stringify({name: org_name, type: org_type, package: org_package}), {headers:this.headers})
                   .catch(this.handleError);
    }

    /**
     *  @param id: id of organization to delete
     *  deletes organization from mock db
     *  response body is null => do not call json() on response
     */
    deleteOrganization(id: number) {
        const url = `${this.orgsUrl}/${id}`;
        return this.http
                   .delete(url)
                   .catch(this.handleError);
    }

    /**
     *  @param organization: organization to save changes to
     *  saves changes to organization in mock db
     *  response body is null => do not call json() on response
     */
    saveOrganization(organization?: Organization) {
        if (organization) {
            const url = `${this.orgsUrl}/${organization.id}`;
            return this.http
                .put(url, JSON.stringify(organization), {headers:this.headers})
                .catch(this.handleError);
        } else {
            console.log('cannot save organization... organization undefined or null');
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

