import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Organization } from '../../../organization';

import { OrganizationsStore } from './organizationsStore';

/**
 *  organization-detail component extends component
 */
@Component({
    selector: 'organization-detail',
    templateUrl: './organization-detail.html'
})


export class OrganizationDetailComponent {
    @Input()
    organization: Organization | null;

    /**
     *  @constructor
     */
    constructor(
        private store: OrganizationsStore,
        private router: Router
    ) { }


    /**
     *  save changes made to this organization in mock db
     */
    saveOrganization(): void {
        if (this.organization) {
            this.store.saveOrganization(this.organization);
        } else {
            console.log('cannot update organization... organization is undefined or null');
        }
    }


    goBack(): void {
        this.organization = null;
        this.router.navigate(['/organizations']);
    }
}
