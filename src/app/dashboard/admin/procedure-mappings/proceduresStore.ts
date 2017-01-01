/*
 * ProcedureStore: observable data service
 *
 * state is managed locally for the ProceduresComponent
 * 
 * _procedures, _selected_procedure: private local state
 * procedures: public local state visible to other components, such that only
 *                this component may adjust its local state
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

import { Procedure } from 'app/procedure';

import { ProceduresBackendService } from './proceduresBackend.service';
import { LocalDataSource } from 'ng2-smart-table';



@Injectable()
export class ProceduresStore {

    /* local state */
    private _procedures: BehaviorSubject<Procedure[]> = new BehaviorSubject([]);
    private _selected_procedure: BehaviorSubject<Procedure> = new BehaviorSubject(null);
    /* only expose observables to prevent store clients from emitting store values */
    public procedures: Observable<Procedure[]> = this._procedures.asObservable();
    

    /**
     * @constructor
     * @param backendService: http backend service
     */
    constructor(private backendService: ProceduresBackendService) {
        this.loadInitialProcedures();
    }


    _settings = {
        add: {
            addButtonContent: 'Add',
            createButtonContent: 'Create',
            cancelButtonContent: 'Cancel',
            confirmCreate: true
        },
        edit: {
            editButtonContent: 'Edit',
            saveButtonContent: 'Save',
            cancelButtonContent: 'Cancel',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: 'Delete',
            confirmDelete: true
        },
        columns: {
            first_name: {
                title: 'First Name',
                type: 'string'
            },
            last_name: {
                title: 'Last Name',
                type: 'string'
            },
            email: {
                title: 'Email',
                type: 'string'
            },
            gender: {
                title: 'Gender',
                type: 'string'
            },
            birthday: {
                title: 'Birthday',
                type: 'string'
            },
            phone: {
                title: 'Phone',
                type: 'string'
            },
            zip: {
                title: 'Zip',
                type: 'string'
            },
            hsr: {
                title: 'HSR',
                type: 'string'
            },
            notes: {
                title: 'Notes',
                type: 'string'
            }
        }
    };
 
    _source: LocalDataSource = new LocalDataSource();


    /**
     *  calls backend service addition function
     *  updates local state
     */
    addProcedure(first_name:string, last_name:string, email:string, gender:string, birthday: string, phone: number, zip: number, hsr: boolean, notes:string): void {
        console.log('_procedures: ', this._procedures);
        let obs = this.backendService
                      .addProcedure(first_name, last_name, email, gender, birthday, phone, zip, hsr, notes)
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
                console.log('Called backend add service');
                console.log(result);
                this._procedures.getValue().push(result);
                console.log('private local state: ', this._procedures);
                console.log('publicly visible state: ', this.procedures);
            },
            error => {
                console.log('Error adding procedure...');
            }
        );
    }

    /**
     *  @param id: id of procedure to delete
     *  calls backend service deletion function
     *  updates local state
     */
    deleteProcedure(id: number) {
        let obs = this.backendService.deleteProcedure(id);
        obs.subscribe(
            result => {
                console.log('Called backend delete service');
                let delete_id = this._procedures.getValue().findIndex((org) => org.id === id);
                this._procedures.getValue().splice(delete_id, 1);
                if (this._selected_procedure.getValue()) {
                    if (this._selected_procedure.getValue().id === id) {
                        this._selected_procedure.next(null);
                    }
                }
//                this._procedures.next(this._procedures.getValue());
                console.log('private local state: ', this._procedures);
                console.log('publicly visible state: ', this.procedures);
            },
            error => {
                console.log('Error deleting procedure...');
            }
        );
    }

    /**
     *  @param procedure: procedure to save changes to
     *  calls backend service saving function
     *  local state is updated through two-way binding between model and view
     */
    saveProcedure(procedure: Procedure) {
        let obs = this.backendService.saveProcedure(procedure);
        obs.subscribe(
            result => {
                console.log('Called backend save service');
                console.log('private local state: ', this._procedures);
                console.log('publicly visible state: ', this.procedures);
            },
            error => {
                console.log('Error saving procedure...');
            }
        );
    }

    /**
     *  @param procedure: selected procedure
     *  view details of procedure
     *  update local state
     */
    select(procedure: Procedure) {
        this._selected_procedure.next(procedure);
    }

    /**
     *  fetches initial array of procedures
     *  emits new value to _procedures
     *  procedures is updated
     *  view is rendered using procedures
     */
    loadInitialProcedures() {
        let obs = this.backendService
                      .getProcedures()
                      .map(response => response = response.json().data);
        obs.subscribe(
            result => {
//                console.log(res);
//                console.log(<Procedure>res[1]);
                this._procedures.next(result);
                this._source.load(result);
//                console.log(this._procedures);
//                console.log(this._procedures.getValue());
//                console.log(this.procedures);
            },
            error => {
                console.log('Error fetching procedures...');
            }
        );
    }
}
