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
var studioUsersStore_1 = require("./studioUsersStore");
/**
 *  user-detail component extends component
 */
var UserDetailComponent = (function () {
    /**
     *  @constructor
     */
    function UserDetailComponent(router, store) {
        this.router = router;
        this.store = store;
    }
    /**
     *  save changes made to this user in mock db
     */
    UserDetailComponent.prototype.saveStudioUser = function () {
        if (this.user) {
            this.store.saveStudioUser(this.user);
        }
        else {
            console.log('cannot update user... user is undefined or null');
        }
    };
    UserDetailComponent.prototype.goBack = function () {
        this.user = null;
        this.router.navigate(['/studio-users']);
    };
    return UserDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserDetailComponent.prototype, "user", void 0);
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'user_detail',
        templateUrl: 'app/dashboard/admin/studio-users/user_detail.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        studioUsersStore_1.StudioUsersStore])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map