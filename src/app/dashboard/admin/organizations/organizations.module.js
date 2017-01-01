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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var organizations_component_1 = require("./organizations.component");
var organization_detail_component_1 = require("./organization-detail.component");
var organizationsBackend_service_1 = require("./organizationsBackend.service");
var organizationsStore_1 = require("./organizationsStore");
var organizations_routing_module_1 = require("./organizations-routing.module");
var OrganizationsModule = (function () {
    function OrganizationsModule() {
    }
    return OrganizationsModule;
}());
OrganizationsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            organizations_routing_module_1.OrganizationsRoutingModule
        ],
        exports: [
            organizations_component_1.OrganizationsComponent,
            organization_detail_component_1.OrganizationDetailComponent
        ],
        declarations: [
            organizations_component_1.OrganizationsComponent,
            organization_detail_component_1.OrganizationDetailComponent
        ],
        providers: [
            organizationsBackend_service_1.OrganizationsBackendService,
            organizationsStore_1.OrganizationsStore
        ]
    }),
    __metadata("design:paramtypes", [])
], OrganizationsModule);
exports.OrganizationsModule = OrganizationsModule;
//# sourceMappingURL=organizations.module.js.map