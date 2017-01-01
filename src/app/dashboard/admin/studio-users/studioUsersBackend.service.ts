/*
 * StudioUsersBackendService: http backend for observable data store
 *
 * no state is managed here
 *
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from 'app/user';

@Injectable()
export class StudioUsersBackendService {

    private usersUrl = 'app/users';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http) { }


    /*
     *  fetch users as a stream from mock db
     */
    getStudioUsers() {
        return this.http
                   .get(this.usersUrl)
                   .catch(this.handleError);
    }


    /**
     *
     */
    searchStudioUsers(user_name?: string) {
        if (user_name) {
            console.log('Backend service fetching search term...');
            return this.http
                       .get(this.usersUrl + `?first_name=${user_name}`)
                       .catch(this.handleError);
        } else {
            console.log('No search term... Backend service fetching all studio users');
        }
    }


    /**
     *  @param first_name: first name of user to add
     *  @param last_name: last name of user to add
     *  @param role: role of user to add
     *  @param email: email of user to add
     *  @param password: password of user to add
     *  calls backend service addition function
     *  updates local state
     */
    addStudioUser(first_name: string, last_name:string, role: string, email: string, password: string) {
        return this.http
                   .post(this.usersUrl, JSON.stringify({first_name:first_name, last_name:last_name, role:role, email:email, password:password, pin:1111}), {headers:this.headers})
                   .catch(this.handleError);
    }


    /**
     *  @param id: id of user to delete
     *  deletes user from mock db
     *  response body is null => do not call json() on response
     */
    deleteStudioUser(id: number) {
        const url = `${this.usersUrl}/${id}`;
        return this.http
                   .delete(url)
                   .catch(this.handleError);
    }

    /**
     *  @param user: user to save changes to
     *  saves changes to user in mock db
     *  response body is null => do not call json() on response
     */
    saveStudioUser(user?: User) {
        if (user) {
            const url = `${this.usersUrl}/${user.id}`;
            return this.http
                .put(url, JSON.stringify(user), {headers:this.headers})
                .catch(this.handleError);
        } else {
            console.log('cannot save user... user undefined or null');
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

