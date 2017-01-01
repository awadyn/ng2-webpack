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
 * OrganizationStore: observable data service
 *
 * state is managed locally for the OrganizationsComponent
 *
 * _organizations, _selected_organization: private local state
 * organizations: public local state visible to other components, such that only
 *                this component may adjust its local state
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Rx_1 = require("rxjs/Rx");
var organizationsBackend_service_1 = require("./organizationsBackend.service");
var OrganizationsStore = (function () {
    /**
     * @constructor
     * @param backendService: http backend service
     */
    function OrganizationsStore(backendService) {
        this.backendService = backendService;
        /* local state */
        this._organizations = new Rx_1.BehaviorSubject([]);
        this._selected_organization = new Rx_1.BehaviorSubject(null);
        /* only expose observables to prevent store clients from emitting store values */
        this.organizations = this._organizations.asObservable();
        this.loadInitialOrganizations();
    }
    /**
     *  @param org_name: name of organization to add
     *  @param org_type: type of organization to add
     *  @param org_package: package of organization to add
     *  calls backend service addition function
     *  updates local state
     */
    OrganizationsStore.prototype.addOrganization = function (org_name, org_type, org_package) {
        var _this = this;
        var obs = this.backendService.addOrganization(org_name, org_type, org_package)
            .map(function (response) { return response = response.json().data; });
        obs.subscribe(function (result) {
            console.log('Called backend add service');
            _this._organizations.getValue().push(result);
            console.log('private local state: ', _this._organizations);
            console.log('publicly visible state: ', _this.organizations);
        }, function (error) {
            console.log('Error adding organization...');
        });
    };
    /**
     *  @param id: id of organization to delete
     *  calls backend service deletion function
     *  updates local state
     */
    OrganizationsStore.prototype.deleteOrganization = function (id) {
        var _this = this;
        var obs = this.backendService.deleteOrganization(id);
        obs.subscribe(function (result) {
            console.log('Called backend delete service');
            var delete_id = _this._organizations.getValue().findIndex(function (org) { return org.id === id; });
            _this._organizations.getValue().splice(delete_id, 1);
            if (_this._selected_organization.getValue()) {
                if (_this._selected_organization.getValue().id === id) {
                    _this._selected_organization.next(null);
                }
            }
            //                this._organizations.next(this._organizations.getValue());
            console.log('private local state: ', _this._organizations);
            console.log('publicly visible state: ', _this.organizations);
        }, function (error) {
            console.log('Error deleting organization...');
        });
    };
    /**
     *  @param organization: organization to save changes to
     *  calls backend service saving function
     *  local state is updated through two-way binding between model and view
     */
    OrganizationsStore.prototype.saveOrganization = function (organization) {
        var _this = this;
        var obs = this.backendService.saveOrganization(organization);
        obs.subscribe(function (result) {
            console.log('Called backend save service');
            console.log('private local state: ', _this._organizations);
            console.log('publicly visible state: ', _this.organizations);
        }, function (error) {
            console.log('Error saving organization...');
        });
    };
    /**
     *  @param organization: selected organization
     *  view details of organization
     *  update local state
     */
    OrganizationsStore.prototype.select = function (organization) {
        this._selected_organization.next(organization);
    };
    /**
     *  fetches initial array of organizations
     *  emits new value to _organizations
     *  organizations is updated
     *  view is rendered using organizations
     */
    OrganizationsStore.prototype.loadInitialOrganizations = function () {
        var _this = this;
        var obs = this.backendService.getOrganizations()
            .map(function (response) { return response = response.json().data; });
        obs.subscribe(function (result) {
            //                console.log(res);
            //                console.log(<Organization>res[1]);
            _this._organizations.next(result);
            //                console.log(this._organizations);
            //                console.log(this._organizations.getValue());
            //                console.log(this.organizations);
        }, function (error) {
            console.log('Error fetching organizations...');
        });
    };
    return OrganizationsStore;
}());
OrganizationsStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [organizationsBackend_service_1.OrganizationsBackendService])
], OrganizationsStore);
exports.OrganizationsStore = OrganizationsStore;
//# sourceMappingURL=organizationsStore.js.map