import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Procedure } from '../../../procedure';

import { ProceduresStore } from './proceduresStore';

/**
 *  procedure-detail component extends component
 */
@Component({
    selector: 'procedure-detail',
    templateUrl: './procedure-detail.html'
})


export class ProcedureDetailComponent {
    @Input()
    procedure: Procedure | null;

    /**
     *  @constructor
     */
    constructor(
        private store: ProceduresStore,
        private router: Router
    ) { }


    /**
     *  save changes made to this procedure in mock db
     */
    saveProcedure(): void {
        if (this.procedure) {
            this.store.saveProcedure(this.procedure);
        } else {
            console.log('cannot update procedure... procedure is undefined or null');
        }
    }


    goBack(): void {
        this.procedure = null;
        this.router.navigate(['/procedures']);
    }
}
