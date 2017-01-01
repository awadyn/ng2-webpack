import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { Organization } from '../../../organization';

import { OrganizationsStore } from './organizationsStore';



@Component({
    selector: 'organizations',
    templateUrl: './organizations.html'
})



/*
 *  smart component
 *  manage component state locally
 */
export class OrganizationsComponent implements OnInit, AfterViewInit {
    /**
     *  @constructor
     *  @param store: observable data store
     */
    constructor(private router: Router, private store: OrganizationsStore) {
    }


    addOrganization(org_name:string, org_type:string, org_package:string): void {
        if (org_name && org_type && org_package) {
            org_name = org_name.trim();
            org_type = org_type.trim();
            org_package = org_package.trim();
            console.log('Adding organization');
            this.store.addOrganization(org_name, org_type, org_package);
        } else {
            console.log('Cannot add organization. Missing fields.'); 
        }
    }


    deleteOrganization(id: number): void {
        console.log('Deleting organization with id ', id);
        this.store.deleteOrganization(id);
    }


    updateOrganization(id: number): void {

    }


    searchOrganizations(org_name: string): void {
    }



    ngAfterViewInit(): void {
        console.log('finished rendering view...');
    }


    ngOnInit(): void {
        console.log('finished initializing component...');
    }


    /**
     *
     */
    onSelect(organization?: Organization): void {
        if (organization) {
            console.log('Selected organization ', organization.name); 
            this.store.select(organization);
        } else {
            console.log('No organization selected');
            this.store.select(null);
        }
    }

    /**
     *  go back to admin view
     */
    goBack(): void {
        this.router.navigate(['/admin']);
    }
}
