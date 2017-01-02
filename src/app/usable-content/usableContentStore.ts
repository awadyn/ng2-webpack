import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UUID } from 'angular2-uuid';

import { UsableContent } from './usable-content';

import { UsableContentBackend } from './usableContentBackend.service';



@Injectable()
export class UsableContentStore {

    /**
     *  local state
     */
    private _basic_content: BehaviorSubject<UsableContent[]>;
    public basic_content: Observable<UsableContent[]>;
    private _selected_content: BehaviorSubject<UsableContent[]>;
    public selected_content: Observable<UsableContent[]>;
    private _composite_content: BehaviorSubject<UsableContent[]>;
    public composite_content: Observable<UsableContent[]>;

    private _edited: boolean;
    private _selected_composite: BehaviorSubject<UsableContent>;
    public selected_composite: UsableContent;
    private _new_composite: BehaviorSubject<UsableContent>;
    public new_composite: UsableContent;
    private _selected_prechange_metadata: any;
    private _selected_composite_index: number;

    /**
     *  @constructor
     *  @param _backendService: service that communicates with backend through http requests
     */
    constructor(private _backendService: UsableContentBackend) { 
        this._basic_content = new BehaviorSubject([]);
        this._selected_content = new BehaviorSubject([]);
        this._composite_content = new BehaviorSubject([]);
        this.basic_content = this._basic_content.asObservable();
        this.selected_content = this._selected_content.asObservable();
        this.composite_content = this._composite_content.asObservable();
        this.loadInitialContent();
        this.initParams();
    }



    /**
     *  update local state (model)
     *  - onSelect basic content: - push to selected content list
     *                            - update edited
     *  - onSelect composite content: 
     */
    onSelect(selected_content: UsableContent) {
        console.log('Store onSelect...');
        if (selected_content.getType() == 'basic') {
            this._selected_content.getValue().push(selected_content);
            this._edited = true;
        } else {
            //TODO may add more than one composite type
            if (selected_content.getType() == 'composite') {
                /* Do nothing if composite content is already selected */
                if(this._selected_composite.getValue() === selected_content) {
                    alert('This content is already selected. You may save your changes or select other content to proceed.');
                    return;
                }
                /* Confirm save changes if previous selected composite content has been edited */
                if (this._edited == true) {
                    if (confirm('Do you want to save your changes?')) {
                        this.onSave();
                    }
                }
                /* Set selected composite content */
                this._selected_composite.next(selected_content);
                this._new_composite.next(undefined);
                /* Save selected composite content metadata before any edits, in case user chooses not to save changes */
                let prechange_metadata = {identifiers:{}, timestamp:{}, composition:[], other:{}};
                prechange_metadata.identifiers = Object.assign({}, this._selected_composite.getValue().getMetadata().identifiers);
                prechange_metadata.timestamp = Object.assign({}, this._selected_composite.getValue().getMetadata().timestamp);
                prechange_metadata.composition = Object.assign({}, this._selected_composite.getValue().getMetadata().composition);
                prechange_metadata.other = Object.assign({}, this._selected_composite.getValue().getMetadata().other);
                this._selected_prechange_metadata = prechange_metadata;           
                this._selected_composite_index = this._composite_content.getValue().indexOf(selected_content);
                //TODO query backend for this content_id metadata then push it to selected_content
                /* Decompose selected composite content to list of basic content */
                let decomposed_content: UsableContent[] = [];
                for (let content_id of this._selected_composite.getValue().getComposition()) {
                    decomposed_content.push(this.onCreateBasic(content_id));
                }
                this._selected_content.next(decomposed_content);
                this._edited = false;
            }
        }
    }



    /**
     *  @return new composite content id
     *  wrap selected content into one composite content
     *  update local state (model)
     *  - onSave existing composite content: - update existing composite content
     *                                       - update edited
     *  - onSave new composite content: - push to composite content list
     *                                  - update edited
     */
    onSave(): string {
        console.log('Store onSave...');
        /* if a composite content is not selected, create new composite content and push to composite content list */
        if (this._selected_composite.getValue() === undefined) {
            let new_id = UUID.UUID();
            /* assert that new_id does not exist in composite content ids */
            if (this._composite_content.getValue().find(this.findId(new_id)) != undefined) {
                alert('Error: new composite id not available...');
                return null;
            } else {
                let new_composite_content = this.onCreateComposite(new_id);
                this._composite_content.getValue().push(new_composite_content);
                this._edited = false;
                this._selected_composite.next(new_composite_content);
                /* Save selected composite content metadata before any edits, in case user chooses not to save changes */
                let prechange_metadata = {identifiers:{}, timestamp:{}, composition:[], other:{}};
                prechange_metadata.identifiers = Object.assign({}, this._selected_composite.getValue().getMetadata().identifiers);
                prechange_metadata.timestamp = Object.assign({}, this._selected_composite.getValue().getMetadata().timestamp);
                prechange_metadata.composition = Object.assign({}, this._selected_composite.getValue().getMetadata().composition);
                prechange_metadata.other = Object.assign({}, this._selected_composite.getValue().getMetadata().other);
                this._selected_prechange_metadata = prechange_metadata;           
                this._selected_composite_index = this._composite_content.getValue().indexOf(new_composite_content);
                this._backendService.onSave();
                return new_id;
            }
        } else {
                this.onUpdateComposite();
                //need to update _selected_prechange_metadata or it is already subscribed to _selected_composite?
                this._edited = false;
                this._backendService.onSave();
                return this._selected_composite.getValue().getId();
        }
    }



    /**
     *  update local state (model)
     *  - onNew edited content: - save content
     *                          - push empty list to selected content list
     *  - onNew non-edited content: - push empty list to selected content list
     */
    onNew() {
        console.log('Store onNew...');
        if (this._edited == true) {
            if (confirm('Do you want to save your changes?')) {
                this.onSave();
            } else {
                if (this._selected_composite != undefined) {
                    console.log('rolling back changes...');
                    /* roll back all edits made to this selected composite content's metadata */
                    this._selected_composite.getValue().metadata.identifiers = Object.assign({}, this._selected_prechange_metadata.identifiers);
                    this._selected_composite.getValue().metadata.timestamp = Object.assign({}, this._selected_prechange_metadata.timestamp);
                    this._selected_composite.getValue().metadata.other = Object.assign({}, this._selected_prechange_metadata.other);
                }
            }
        }
        this._selected_content.next([]);
        this.initParams();
    }



    /**
     *
     */
    onDelete() {
        console.log('Store onDelete...');
        if (this._selected_composite.getValue() === undefined && this._edited == false) {
            this._selected_content.next([]);
        } else {
            if (this._edited == false) {
                var confirm_message = 'Are you sure you want to delete this content?';
            } else {
                var confirm_message = 'Are you sure you want to delete this content before saving your changes?';
            }
            if (confirm (confirm_message)) {
                this._composite_content.getValue().splice(this._selected_composite_index, 1);
                this._selected_content.next([]);
                this.initParams();
                /* call backend service to delete from db */
                this._backendService.onDelete();
            } else {
                if (this._selected_composite.getValue() != undefined) {
                     /* roll back all edits made to this selected composite content's metadata */
                    this._selected_composite.next(new UsableContent(this._selected_composite.getValue().getType(), this._selected_composite.getValue().getId(), this._selected_prechange_metadata));
                }
            }
        }
    }



    /**
     *  @return basic content
     *  create basic content given content_id
     */
    onCreateBasic(new_id: string) {
        let time = new Date();
        let new_content = new UsableContent('basic', new_id, {identifiers:{name:'new_created_basic', time_created:time}, timestamp:{}, composition:[new_id], other:{}});
        return new_content;
    }



    /**
     *  @return composite content
     *  create new composite content
     *  @param new_id: id of new composite content
     *  new composite content composition is list of id's of all selected content
     *  new composite content identifiers, timestamp, and other data is specified through user input
     */
    onCreateComposite(new_id: string): UsableContent {
        /* assert that new_composite is not undefined */
        if (this._new_composite.getValue() === undefined) {
            alert('Error: Cannot create new composite content. New composite content is not initialized.');
            return;
            //TODO error handling
        }
        let time = new Date();
        let identifiers = {name: this._new_composite.getValue().getName(), time_created: time};
        let timestamp = {};
        let new_composition = this.getIds(this._selected_content);
        let other = {};
        let new_content = new UsableContent('composite', new_id, {identifiers:identifiers, timestamp:timestamp, composition:new_composition, other:other});
        return new_content;
    }



    /**
     *  update composition of selected_composite
     *  new composition is list of id's of all selected content
     *  NOTE: all other metadata is updated through 2 way binding; no need to update here
     */
    onUpdateComposite() {
        /* assert that composite content is selected */
        if (this._selected_composite.getValue() === undefined) {
            alert('Error: Cannot update selected composite content. Composite content is not selected.');
            return;
            //TODO error handling
        }
        let new_composition = this.getIds(this._selected_content);
        this._selected_composite.getValue().metadata.composition = new_composition;    
    }



    /**
     *  calls callback function for array.prototype.find()
     */
    findId(new_id: string) {
        return function(element) {
                return element.id === new_id;
        }
    }

 
 
    /**
     *  @param BehaviorSubject: stream of content to extract ids from
     *  @return list of ids in param content
     */
    getIds(content_stream: BehaviorSubject<UsableContent[]>): string[] {
        let ids: string[] = [];
        for (let content of content_stream.getValue()) {
            ids.push(content.getId());
        }
        return ids;
    }



    /**
     *
     */
    setEdited(edited: boolean) {
        this._edited = edited;
    }



    /**
     *  initialize all non-stream params to their default values
     */
    initParams() {
        this._edited = false;
        this._selected_composite = new BehaviorSubject(undefined);
        let obs_selected = this._selected_composite
                      .subscribe(
                        result => this.selected_composite = result,
                        error => console.log(error)        
                      );
        /* initialize new_composite content that may be saved later */
        this._new_composite = new BehaviorSubject(undefined);
        this.new_composite = new UsableContent(undefined, undefined, {identifiers:{name:undefined, time_created:undefined}, timestamp:{time_window:undefined, start_time:undefined}, composition:[], other:undefined});
        this._new_composite.next(this.new_composite);
        this._selected_composite_index = -1;
        this._selected_prechange_metadata = undefined;
    }



    /**
     *  calls backend service to fetch content upon initializing store
     */
    loadInitialContent() {
        //TODO call backend service
        //TODO remove temporary initial content
        var uuid_1 = UUID.UUID();
        var uuid_2 = UUID.UUID();
        var time_1 = new Date();
        var time_2;
        var temp_content_1 = new UsableContent('basic', uuid_1, {identifiers: {name:'basic_1', time_created:time_1}, timestamp:{}, composition:[uuid_1], other:{}});
        setTimeout(() => {
                time_2 = new Date();
                var temp_content_2 = new UsableContent('basic', uuid_2, {identifiers: {name:'basic_2', time_created:time_2}, timestamp:[], composition:[uuid_2], other:{}});
                this._basic_content.next([temp_content_1, temp_content_2]);
        }, 1000);
        console.log('loading initial content...');
        console.log('basic_content: ', this.basic_content);
        console.log('selected_content: ', this.selected_content);
        console.log('composite_content', this.composite_content);   
    }

    

}
