"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * StudioUsersStore: observable data store
 *
 * state is managed locally for the StudioUsersComponent
 *
 * _studio_users, _selected_user: private local state
 * studio_users: public local state visible to other components, such that only
 *                this component may adjust its local state
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var Rx_1 = require("rxjs/Rx");
var studioUsersBackend_service_1 = require("./studioUsersBackend.service");
var StudioUsersStore = (function () {
    /**
     * @constructor
     * @param backendService: http backend service
     */
    function StudioUsersStore(backendService) {
        this.backendService = backendService;
        /* local state */
        this._studio_users = new Rx_1.BehaviorSubject([]);
        this._selected_user = new Rx_1.BehaviorSubject(null);
        this._search_terms = new Rx_1.BehaviorSubject('');
        /* only expose observables to prevent store clients from emitting store values */
        this.studio_users = this._studio_users.asObservable();
        this.loadInitialStudioUsers();
    }
    /**
     *  @param user_name: first name of user to search for
     *  calls backend service search function
     *  updates local state to that of search results
     */
    StudioUsersStore.prototype.searchStudioUsers = function (user_name) {
        var _this = this;
        console.log('Searching for user ', user_name);
        var obs = this.backendService.searchStudioUsers(user_name)
            .map(function (response) { return response = response.json().data; });
        obs.subscribe(function (result) {
            console.log('Called backend service');
            console.log(result);
            _this._studio_users.next(result);
            console.log('private local state: ', _this._studio_users);
            console.log('publicly visible state: ', _this.studio_users);
        }, function (error) {
            console.log('Error searching for studio user...');
        });
    };
    /**
     *  @param first_name: first name of user to add
     *  @param last_name: last name of user to add
     *  @param role: role of user to add
     *  @param email: email of user to add
     *  @param password: password of user to add
     *  calls backend service addition function
     *  updates local state
     */
    StudioUsersStore.prototype.addStudioUser = function (first_name, last_name, role, email, password) {
        var _this = this;
        var obs = this.backendService.addStudioUser(first_name, last_name, role, email, password)
            .map(function (response) { return response = response.json().data; });
        obs.subscribe(function (result) {
            console.log('Called backend add service');
            _this._studio_users.getValue().push(result);
            console.log('private local state: ', _this._studio_users);
            console.log('publicly visible state: ', _this.studio_users);
        }, function (error) {
            console.log('Error adding studio user...');
        });
    };
    /**
     *  @param id: id of user to delete
     *  calls backend service deletion function
     *  updates local state
     */
    StudioUsersStore.prototype.deleteStudioUser = function (id) {
        var _this = this;
        var obs = this.backendService.deleteStudioUser(id);
        obs.subscribe(function (result) {
            console.log('Called backend delete service');
            var delete_index = _this._studio_users.getValue().findIndex(function (user) { return user.id === id; });
            _this._studio_users.getValue().splice(delete_index, 1);
            if (_this._selected_user.getValue()) {
                if (_this._selected_user.getValue().id === id) {
                    _this._selected_user.next(null);
                }
            }
            console.log('private local state: ', _this._studio_users);
            console.log('publicly visible state: ', _this.studio_users);
        }, function (error) {
            console.log('Error deleting studio user...');
        });
    };
    /**
     *  @param user: user to save changes to
     *  calls backend service saving function
     *  local state is updated through two-way binding between model and view
     */
    StudioUsersStore.prototype.saveStudioUser = function (user) {
        var _this = this;
        var obs = this.backendService.saveStudioUser(user);
        obs.subscribe(function (result) {
            console.log('Called backend save service');
            console.log('private local state: ', _this._studio_users);
            console.log('publicly visible state: ', _this.studio_users);
        }, function (error) {
            console.log('Error saving studio user...');
        });
    };
    /**
     *  @param user: selected user
     *  view details of user
     *  update local state
     */
    StudioUsersStore.prototype.select = function (user) {
        this._selected_user.next(user);
    };
    /**
     *  fetches initial array of studio users
     *  emits new value to _studio_users
     *  studio_users is updated automatically
     *  view is rendered using studio_users
     */
    StudioUsersStore.prototype.loadInitialStudioUsers = function () {
        var _this = this;
        var obs = this.backendService.getStudioUsers()
            .map(function (response) { return response = response.json().data; });
        obs.subscribe(function (result) {
            console.log('Called backend get service');
            _this._studio_users.next(result);
            console.log('private local state: ', _this._studio_users);
            console.log('publicly visible state: ', _this.studio_users);
        }, function (error) {
            console.log('Error fetching studio users...');
        });
    };
    return StudioUsersStore;
}());
StudioUsersStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [studioUsersBackend_service_1.StudioUsersBackendService])
], StudioUsersStore);
exports.StudioUsersStore = StudioUsersStore;
//# sourceMappingURL=studioUsersStore.js.map