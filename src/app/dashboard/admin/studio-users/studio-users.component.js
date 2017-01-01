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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/of");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/catch");
var studioUsersStore_1 = require("./studioUsersStore");
var StudioUsersComponent = (function () {
    /**
     *  @constructor
     *  @param store: observable data store
     */
    function StudioUsersComponent(router, store) {
        this.router = router;
        this.store = store;
    }
    StudioUsersComponent.prototype.addStudioUser = function (first_name, last_name, role, email, password) {
        if (first_name && last_name && role && email && password) {
            first_name = first_name.trim();
            last_name = last_name.trim();
            role = role.trim();
            console.log('Adding user');
            this.store.addStudioUser(first_name, last_name, role, email, password);
        }
        else {
            console.log('Cannot add studio user. Missing fields.');
        }
    };
    StudioUsersComponent.prototype.deleteStudioUser = function (id) {
        console.log('Deleting studio user with id ', id);
        this.store.deleteStudioUser(id);
    };
    /**
     *  @param user_name: first name of user to search for
     *  search db studio users for user with user_name
     */
    StudioUsersComponent.prototype.searchStudioUsers = function (user_name) {
        setTimeout(this.store.searchStudioUsers(user_name), 1000);
    };
    //    ngOnInit(): void {
    ////        this.getUsers();
    //        this.selected_user = null;
    //        this.search_results = this.search_terms
    //            .debounceTime(200)
    //            .distinctUntilChanged()
    //            .switchMap((user_name) =>
    //                user_name? this.studio_users_service
    //                               .searchStudioUsers(user_name)
    //                : this.studio_users_service
    //                      .getStudioUsers()
    //            )
    //            .catch(error => {
    //                console.log(error);
    //                return Observable.of<User[]>([]);
    //            });
    //        this.search_results
    //            .map(response => this.users = response)
    //            .subscribe(
    //                result => console.log(this.users),
    //                error => console.log(error)
    //            );
    //        let obs = this.studio_users_service
    //                      .http
    //                      .get('app/orgs')
    //                      .map(response => response = response.json().data);
    //        obs.subscribe(
    //            result => {
    //                console.log(result);
    //                this._organizations.next(result);
    //            },
    //            error => {
    //                console.log('Error fetching organizations...');
    //            }
    //        );
    //    }
    StudioUsersComponent.prototype.ngAfterViewInit = function () {
        console.log('finished rendering view...');
    };
    StudioUsersComponent.prototype.ngOnInit = function () {
        console.log('finished initializing component...');
    };
    StudioUsersComponent.prototype.onSelect = function (user) {
        if (user) {
            console.log('Selected user ', user.first_name);
            this.store.select(user);
        }
        else {
            console.log('No user selected');
            this.store.select(null);
        }
    };
    /**
     *  go back to admin view
     */
    StudioUsersComponent.prototype.goBack = function () {
        this.router.navigate(['/admin']);
    };
    return StudioUsersComponent;
}());
StudioUsersComponent = __decorate([
    core_1.Component({
        selector: 'studio_users',
        templateUrl: 'app/dashboard/admin/studio-users/studio_users.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, studioUsersStore_1.StudioUsersStore])
], StudioUsersComponent);
exports.StudioUsersComponent = StudioUsersComponent;
//# sourceMappingURL=studio-users.component.js.map