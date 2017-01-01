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
 * OrganizationBackendService: http backend for observable data store
 *
 * no state is managed here
 *
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var OrganizationsBackendService = (function () {
    function OrganizationsBackendService(http) {
        this.http = http;
        this.orgsUrl = 'app/orgs';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /*
     *  fetch organizations as a stream from mock db
     */
    OrganizationsBackendService.prototype.getOrganizations = function () {
        return this.http.get(this.orgsUrl)
            .catch(this.handleError);
    };
    /**
     *  @param org_name: name of organization to add
     *  @param org_type: type of organization to add
     *  @param org_package: package of organization to add
     *  adds organization to mock db
     *  response body is object representation of added organization
     *  new organization id set through auto-increment
     */
    OrganizationsBackendService.prototype.addOrganization = function (org_name, org_type, org_package) {
        return this.http
            .post(this.orgsUrl, JSON.stringify({ name: org_name, type: org_type, package: org_package }), { headers: this.headers })
            .catch(this.handleError);
    };
    /**
     *  @param id: id of organization to delete
     *  deletes organization from mock db
     *  response body is null => do not call json() on response
     */
    OrganizationsBackendService.prototype.deleteOrganization = function (id) {
        var url = this.orgsUrl + "/" + id;
        return this.http
            .delete(url)
            .catch(this.handleError);
    };
    /**
     *  @param organization: organization to save changes to
     *  saves changes to organization in mock db
     *  response body is null => do not call json() on response
     */
    OrganizationsBackendService.prototype.saveOrganization = function (organization) {
        if (organization) {
            var url = this.orgsUrl + "/" + organization.id;
            return this.http
                .put(url, JSON.stringify(organization), { headers: this.headers })
                .catch(this.handleError);
        }
        else {
            console.log('cannot save organization... organization undefined or null');
            return;
        }
    };
    /*
     *  handle errors from http requests
     */
    OrganizationsBackendService.prototype.handleError = function (error) {
        console.error('An error occured, ', error);
        return Promise.reject(error.message || error);
    };
    return OrganizationsBackendService;
}());
OrganizationsBackendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], OrganizationsBackendService);
exports.OrganizationsBackendService = OrganizationsBackendService;
//# sourceMappingURL=organizationsBackend.service.js.map