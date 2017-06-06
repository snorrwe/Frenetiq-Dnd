"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var container_directive_1 = require("./directives/container.directive");
var draggable_directive_1 = require("./directives/draggable.directive");
var drag_service_1 = require("./services/drag.service");
var FrenetiqDnd = (function () {
    function FrenetiqDnd() {
    }
    return FrenetiqDnd;
}());
FrenetiqDnd = __decorate([
    core_1.NgModule({
        declarations: [
            container_directive_1.ContainerDirective,
            draggable_directive_1.DraggableDirective
        ],
        providers: [
            drag_service_1.DragService
        ],
        exports: [
            container_directive_1.ContainerDirective,
            draggable_directive_1.DraggableDirective
        ]
    })
], FrenetiqDnd);
exports.FrenetiqDnd = FrenetiqDnd;
//# sourceMappingURL=ngx-frenetiq-dnd.js.map