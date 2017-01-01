/*
 * StudioUsersStore: observable data store
 *
 * state is managed locally for the StudioUsersComponent
 * 
 * _studio_users, _selected_user: private local state
 * studio_users: public local state visible to other components, such that only
 *                this component may adjust its local state
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from 'app/user';

import { StudioUsersBackendService } from './studioUsersBackend.service';



@Injectable()
export class StudioUsersStore {

    /* local state */
    private _studio_users: BehaviorSubject<User[]> = new BehaviorSubject([]);
    private _selected_user: BehaviorSubject<User> = new BehaviorSubject(null);
    private _search_terms: BehaviorSubject<string> = new BehaviorSubject('');
    /* only expose observables to prevent store clients from emitting store values */
    public studio_users: Observable<User[]> = this._studio_users.asObservable();


    /**
     * @constructor
     * @param backendService: http backend service
     */
    constructor(private backendService: StudioUsersBackendService) {
        this.loadInitialStudioUsers();
    }


    /**
     *  @param user_name: first name of user to search for
     *  calls backend service search function
     *  updates local state to that of search results
     */
    searchStudioUsers(user_name: string) {
        console.log('Searching for user ', user_name);
        let obs = this.backendService.searchStudioUsers(user_name)
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log('Called backend service');
                console.log(result);
                this._studio_users.next(result);
                console.log('private local state: ', this._studio_users);
                console.log('publicly visible state: ', this.studio_users); 
            },
            error => {
                console.log('Error searching for studio user...');
            }
        );
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
        let obs = this.backendService.addStudioUser(first_name, last_name, role, email, password)
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log('Called backend add service');
                this._studio_users.getValue().push(result);
                console.log('private local state: ', this._studio_users);
                console.log('publicly visible state: ', this.studio_users);
            },
            error => {
                console.log('Error adding studio user...');
            }
        );
    }

    /**
     *  @param id: id of user to delete
     *  calls backend service deletion function
     *  updates local state
     */
    deleteStudioUser(id: number) {
        let obs = this.backendService.deleteStudioUser(id);
        obs.subscribe(
            result => {
                console.log('Called backend delete service');
                let delete_index = this._studio_users.getValue().findIndex((user) => user.id === id);
                this._studio_users.getValue().splice(delete_index, 1);
                if(this._selected_user.getValue()) {
                        if (this._selected_user.getValue().id === id) {
                            this._selected_user.next(null);
                        }
                }
                console.log('private local state: ', this._studio_users);
                console.log('publicly visible state: ', this.studio_users);
            },
            error => {
                console.log('Error deleting studio user...');
            }
        );
    }

    /**
     *  @param user: user to save changes to
     *  calls backend service saving function
     *  local state is updated through two-way binding between model and view
     */
    saveStudioUser(user: User) {
        let obs = this.backendService.saveStudioUser(user);
        obs.subscribe(
            result => {
                console.log('Called backend save service');
                console.log('private local state: ', this._studio_users);
                console.log('publicly visible state: ', this.studio_users);
            },
            error => {
                console.log('Error saving studio user...');
            }
        );
    }

    /**
     *  @param user: selected user
     *  view details of user
     *  update local state
     */
    select(user: User) {
        this._selected_user.next(user);
    }

    /**
     *  fetches initial array of studio users
     *  emits new value to _studio_users
     *  studio_users is updated automatically
     *  view is rendered using studio_users
     */
    loadInitialStudioUsers() {
        let obs = this.backendService.getStudioUsers()
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log('Called backend get service');
                this._studio_users.next(result);
                console.log('private local state: ', this._studio_users);
                console.log('publicly visible state: ', this.studio_users);
            },
            error => {
                console.log('Error fetching studio users...');
            }
        );
    }
}

