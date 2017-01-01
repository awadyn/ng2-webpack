import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { Procedure } from '../../../procedure';

import { ProceduresStore } from './proceduresStore';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'procedures',
    templateUrl: './procedures.html'
})



/*
 *  smart component
 *  manage component state locally
 */
export class ProceduresComponent implements OnInit, AfterViewInit {
    /**
     *  @constructor
     *  @param store: observable data store
     */
    constructor(private router: Router, private store: ProceduresStore) {
    }


    /**
     *
     */
    onDeleteConfirm(event): void {
        console.log('Confirming delete...');
        console.log(event);
        if (window.confirm('Are you sure you want to delete this procedure?')) {
            event.confirm.resolve();
            console.log('Deleting row...');
            this.store.deleteProcedure(event.data.id);
        } else {
            event.confirm.reject();
        }
    }

    /**
     *
     */
    onEditConfirm(event): void {
        console.log('Confirming edit...');
        console.log(event);
        if (window.confirm('Please confirm your changes:')) {
            event.confirm.resolve();
            console.log('Editting row...');
            this.store.saveProcedure(event.data);
        } else {
            event.confirm.reject();
        }
    }

    /**
     *
     */
    onCreateConfirm(event): void {
        console.log('Confirming create...');
        console.log(event);
        if (window.confirm('Please confirm your additions:')) {
            console.log('Adding row...');
            this.store.addProcedure(event.newData.first_name, event.newData.last_name, event.newData.email, event.newData.gender, event.newData.birthday, event.newData.phone, event.newData.zip, event.newData.hsr, event.newData.notes);  
            setTimeout(() => event.confirm.resolve(), 1000);
        } else {
            event.confirm.reject();
        }
    }


    //TODO REMOVE
    addProcedure(first_name:string, last_name:string, email: string, gender:string, birthday: string, phone:number, zip:number, hsr: boolean, notes?:string): void {
        if (first_name && last_name && email && hsr && gender && phone && zip && birthday && email) {
            console.log('Adding procedure');
            if (notes) {
                this.store.addProcedure(first_name, last_name, email, gender, birthday, phone, zip, hsr, notes);
            } else {
                this.store.addProcedure(first_name, last_name, email, gender, birthday, phone, zip, hsr, ''); 
            }
        } else {
            console.log('Cannot add procedure. Missing fields.'); 
        }
    }


    deleteProcedure(id: number): void {
        console.log('Deleting procedure with id ', id);
        this.store.deleteProcedure(id);
    }


    updateProcedure(id: number): void {

    }


    searchProcedures(procedure_name: string): void {
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
    onSelect(procedure?: Procedure): void {
        if (procedure) {
            console.log('Selected procedure ', procedure.first_name); 
            this.store.select(procedure);
        } else {
            console.log('No procedure selected');
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
