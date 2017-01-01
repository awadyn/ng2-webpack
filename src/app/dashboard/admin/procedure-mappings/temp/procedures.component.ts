import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { ProceduresService } from './procedures.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'procedures',
    templateUrl: './procedures.html'
})



/**
 *  
 */
export class ProceduresComponent {

    /**
     *  @constructor
     */
    constructor(private router: Router, private service: ProceduresService) { 
        this.service.getData()
                    .then(response => this.source.load(response));
    }


    settings = {
    
        add: {
            addButtonContent: 'Add',
            createButtonContent: 'Create',
            cancelButtonContent: 'Cancel'
        },
        edit: {
            editButtonContent: 'Edit',
            saveButtonContent: 'Save',
            cancelButtonContent: 'Cancel'
        },
        delete: {
            deleteButtonContent: 'Delete',
            confirmDelete: 'Are you sure you want to delete?'
        },
        columns: {
            id: {
                title: 'Id',
                type: 'number'
            },
            field_1: {
                title: 'field_1',
                type: 'string'
            },
            field_2: {
                title: 'field_2',
                type: 'string'
            }
        }
    };

    source: LocalDataSource = new LocalDataSource();


    /**
     *
     */
    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    /*
     *  go back to admin view
     */
    goBack(): void {
        this.router.navigate(['/admin']);
    }

}
