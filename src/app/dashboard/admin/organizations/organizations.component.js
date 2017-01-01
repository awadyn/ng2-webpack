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
var organizationsStore_1 = require("./organizationsStore");
var OrganizationsComponent = (function () {
    /**
     *  @constructor
     *  @param store: observable data store
     */
    function OrganizationsComponent(router, store) {
        this.router = router;
        this.store = store;
    }
    OrganizationsComponent.prototype.addOrganization = function (org_name, org_type, org_package) {
        if (org_name && org_type && org_package) {
            org_name = org_name.trim();
            org_type = org_type.trim();
            org_package = org_package.trim();
            console.log('Adding organization');
            this.store.addOrganization(org_name, org_type, org_package);
        }
        else {
            console.log('Cannot add organization. Missing fields.');
        }
    };
    OrganizationsComponent.prototype.deleteOrganization = function (id) {
        console.log('Deleting organization with id ', id);
        this.store.deleteOrganization(id);
    };
    OrganizationsComponent.prototype.updateOrganization = function (id) {
    };
    OrganizationsComponent.prototype.searchOrganizations = function (org_name) {
    };
    OrganizationsComponent.prototype.ngAfterViewInit = function () {
        console.log('finished rendering view...');
    };
    OrganizationsComponent.prototype.ngOnInit = function () {
        console.log('finished initializing component...');
    };
    /**
     *
     */
    OrganizationsComponent.prototype.onSelect = function (organization) {
        if (organization) {
            console.log('Selected organization ', organization.name);
            this.store.select(organization);
        }
        else {
            console.log('No organization selected');
            this.store.select(null);
        }
    };
    /**
     *  go back to admin view
     */
    OrganizationsComponent.prototype.goBack = function () {
        this.router.navigate(['/admin']);
    };
    return OrganizationsComponent;
}());
OrganizationsComponent = __decorate([
    core_1.Component({
        selector: 'organizations',
        templateUrl: 'app/dashboard/admin/organizations/organizations.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, organizationsStore_1.OrganizationsStore])
], OrganizationsComponent);
exports.OrganizationsComponent = OrganizationsComponent;
//# sourceMappingURL=organizations.component.js.map