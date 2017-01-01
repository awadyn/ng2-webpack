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
/**
 *  organization-detail component extends component
 */
var OrganizationDetailComponent = (function () {
    /**
     *  @constructor
     */
    function OrganizationDetailComponent(store, router) {
        this.store = store;
        this.router = router;
    }
    /**
     *  save changes made to this organization in mock db
     */
    OrganizationDetailComponent.prototype.saveOrganization = function () {
        if (this.organization) {
            this.store.saveOrganization(this.organization);
        }
        else {
            console.log('cannot update organization... organization is undefined or null');
        }
    };
    OrganizationDetailComponent.prototype.goBack = function () {
        this.organization = null;
        this.router.navigate(['/organizations']);
    };
    return OrganizationDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OrganizationDetailComponent.prototype, "organization", void 0);
OrganizationDetailComponent = __decorate([
    core_1.Component({
        selector: 'organization-detail',
        templateUrl: 'app/dashboard/admin/organizations/organization-detail.html'
    }),
    __metadata("design:paramtypes", [organizationsStore_1.OrganizationsStore,
        router_1.Router])
], OrganizationDetailComponent);
exports.OrganizationDetailComponent = OrganizationDetailComponent;
//# sourceMappingURL=organization-detail.component.js.map