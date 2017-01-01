/*
 * OrganizationStore: observable data service
 *
 * state is managed locally for the OrganizationsComponent
 * 
 * _organizations, _selected_organization: private local state
 * organizations: public local state visible to other components, such that only
 *                this component may adjust its local state
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

import { Organization } from 'app/organization';

import { OrganizationsBackendService } from './organizationsBackend.service';



@Injectable()
export class OrganizationsStore {

    /* local state */
    private _organizations: BehaviorSubject<Organization[]> = new BehaviorSubject([]);
    private _selected_organization: BehaviorSubject<Organization> = new BehaviorSubject(null);
    /* only expose observables to prevent store clients from emitting store values */
    public organizations: Observable<Organization[]> = this._organizations.asObservable();
    

    /**
     * @constructor
     * @param backendService: http backend service
     */
    constructor(private backendService: OrganizationsBackendService) {
        this.loadInitialOrganizations();
    }


    /**
     *  @param org_name: name of organization to add
     *  @param org_type: type of organization to add
     *  @param org_package: package of organization to add
     *  calls backend service addition function
     *  updates local state
     */
    addOrganization(org_name: string, org_type: string, org_package: string) {
        let obs = this.backendService.addOrganization(org_name, org_type, org_package)
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log('Called backend add service');
                this._organizations.getValue().push(result);
                console.log('private local state: ', this._organizations);
                console.log('publicly visible state: ', this.organizations);
            },
            error => {
                console.log('Error adding organization...');
            }
        );
    }

    /**
     *  @param id: id of organization to delete
     *  calls backend service deletion function
     *  updates local state
     */
    deleteOrganization(id: number) {
        let obs = this.backendService.deleteOrganization(id);
        obs.subscribe(
            result => {
                console.log('Called backend delete service');
                let delete_id = this._organizations.getValue().findIndex((org) => org.id === id);
                this._organizations.getValue().splice(delete_id, 1);
                if (this._selected_organization.getValue()) {
                    if (this._selected_organization.getValue().id === id) {
                        this._selected_organization.next(null);
                    }
                }
//                this._organizations.next(this._organizations.getValue());
                console.log('private local state: ', this._organizations);
                console.log('publicly visible state: ', this.organizations);
            },
            error => {
                console.log('Error deleting organization...');
            }
        );
    }

    /**
     *  @param organization: organization to save changes to
     *  calls backend service saving function
     *  local state is updated through two-way binding between model and view
     */
    saveOrganization(organization: Organization) {
        let obs = this.backendService.saveOrganization(organization);
        obs.subscribe(
            result => {
                console.log('Called backend save service');
                console.log('private local state: ', this._organizations);
                console.log('publicly visible state: ', this.organizations);
            },
            error => {
                console.log('Error saving organization...');
            }
        );
    }

    /**
     *  @param organization: selected organization
     *  view details of organization
     *  update local state
     */
    select(organization: Organization) {
        this._selected_organization.next(organization);
    }

    /**
     *  fetches initial array of organizations
     *  emits new value to _organizations
     *  organizations is updated
     *  view is rendered using organizations
     */
    loadInitialOrganizations() {
        let obs = this.backendService.getOrganizations()
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log(result);
//                console.log(<Organization>res[1]);
                this._organizations.next(result);
//                console.log(this._organizations);
//                console.log(this._organizations.getValue());
//                console.log(this.organizations);
            },
            error => {
                console.log('Error fetching organizations...');
            }
        );
    }
}
