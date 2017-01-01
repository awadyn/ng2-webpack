/**
 *  asynchronous service that provides studio users
 */
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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
//import { USERS } from './mock-studio-users';
var StudioUsersService = (function () {
    function StudioUsersService(http) {
        this.http = http;
        this.usersUrl = 'app/users';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /**
     *  @param user_name: first_name of user
     *  searches and returns users with first_name = user_name
     */
    //    searchStudioUsers(user_name: string): Promise<User[]> {
    //        return this.http.get(this.usersUrl + `?first_name=${user_name}`)
    //            .toPromise()
    //            .then(response => response.json().data as User[])
    //            .catch(this.handleError);
    //    }
    StudioUsersService.prototype.searchStudioUsers = function (user_name) {
        return this.http.get(this.usersUrl + ("?first_name=" + user_name))
            .map(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    /**
     *  http.get returns an RxJS observable
     *  observable is converted to a promise to return a list of users
     *  returns User[]
     */
    StudioUsersService.prototype.getStudioUsersAsObservable = function () {
        return this.http.get(this.usersUrl)
            .map(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    StudioUsersService.prototype.getStudioUsers = function () {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    /**
     *  simulate slow connection
     */
    StudioUsersService.prototype.getStudioUsersSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(resolve, 2000); }).then(function () { return _this.getStudioUsers(); });
    };
    /**
     *  @param pin: pin of studio user whose data we want to retrieve
     *  returns User
     */
    StudioUsersService.prototype.getStudioUser = function (pin) {
        return this.getStudioUsers()
            .then(function (users) { return users.find(function (user) { return user.pin === pin; }); })
            .catch(this.handleError);
    };
    /**
     *  @param user: updated user
     *  updates user details based on the changes made
     */
    StudioUsersService.prototype.updateStudioUser = function (user) {
        if (user) {
            var url = this.usersUrl + "/" + user.id;
            this.http.put(url, JSON.stringify(user), { headers: this.headers })
                .toPromise()
                .then(function (res) { return console.log(res); })
                .catch(this.handleError);
        }
        else {
            console.log('cannot update... user undefined or null');
        }
    };
    /**
     * @param first_name: first name of user to be added
     * @param last_name: last name of user to be added
     * @param role: role of user to be added
     * @param email: email of user to be added
     * @param password: password of user to be added
     * adds a user to list of users
     */
    StudioUsersService.prototype.createStudioUser = function (first_name, last_name, role, email, password) {
        return this.http
            .post(this.usersUrl, JSON.stringify({ first_name: first_name, last_name: last_name, role: role, email: email, password: password, pin: 1111 }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    /**
     * @param id: id of user to be deleted
     * deletes a user from list of users
     */
    StudioUsersService.prototype.deleteStudioUser = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return console.log(res); })
            .catch(this.handleError);
    };
    /**
     *  error handler
     */
    StudioUsersService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    StudioUsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StudioUsersService);
    return StudioUsersService;
}());
exports.StudioUsersService = StudioUsersService;
//# sourceMappingURL=studio-users.service.js.map