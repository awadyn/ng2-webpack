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
 * StudioUsersBackendService: http backend for observable data store
 *
 * no state is managed here
 *
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var StudioUsersBackendService = (function () {
    function StudioUsersBackendService(http) {
        this.http = http;
        this.usersUrl = 'app/users';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /*
     *  fetch users as a stream from mock db
     */
    StudioUsersBackendService.prototype.getStudioUsers = function () {
        return this.http
            .get(this.usersUrl)
            .catch(this.handleError);
    };
    /**
     *
     */
    StudioUsersBackendService.prototype.searchStudioUsers = function (user_name) {
        if (user_name) {
            console.log('Backend service fetching search term...');
            return this.http
                .get(this.usersUrl + ("?first_name=" + user_name))
                .catch(this.handleError);
        }
        else {
            console.log('No search term... Backend service fetching all studio users');
        }
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
    StudioUsersBackendService.prototype.addStudioUser = function (first_name, last_name, role, email, password) {
        return this.http
            .post(this.usersUrl, JSON.stringify({ first_name: first_name, last_name: last_name, role: role, email: email, password: password, pin: 1111 }), { headers: this.headers })
            .catch(this.handleError);
    };
    /**
     *  @param id: id of user to delete
     *  deletes user from mock db
     *  response body is null => do not call json() on response
     */
    StudioUsersBackendService.prototype.deleteStudioUser = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http
            .delete(url)
            .catch(this.handleError);
    };
    /**
     *  @param user: user to save changes to
     *  saves changes to user in mock db
     *  response body is null => do not call json() on response
     */
    StudioUsersBackendService.prototype.saveStudioUser = function (user) {
        if (user) {
            var url = this.usersUrl + "/" + user.id;
            return this.http
                .put(url, JSON.stringify(user), { headers: this.headers })
                .catch(this.handleError);
        }
        else {
            console.log('cannot save user... user undefined or null');
            return;
        }
    };
    /*
     *  handle errors from http requests
     */
    StudioUsersBackendService.prototype.handleError = function (error) {
        console.error('An error occured, ', error);
        return Promise.reject(error.message || error);
    };
    return StudioUsersBackendService;
}());
StudioUsersBackendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StudioUsersBackendService);
exports.StudioUsersBackendService = StudioUsersBackendService;
//# sourceMappingURL=studioUsersBackend.service.js.map