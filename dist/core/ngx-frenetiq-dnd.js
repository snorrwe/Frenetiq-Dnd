"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var container_directive_1 = require("./directives/container.directive");
exports.ContainerDirective = container_directive_1.ContainerDirective;
var draggable_directive_1 = require("./directives/draggable.directive");
exports.DraggableDirective = draggable_directive_1.DraggableDirective;
var drag_service_1 = require("./services/drag.service");
exports.DragService = drag_service_1.DragService;
var core_options_1 = require("./model/core.options");
exports.CoreDefaultOptions = core_options_1.DefaultOptions;
exports.getDefaultOptionsCopy = core_options_1.getDefaultOptionsCopy;
var draggable_options_1 = require("./model/draggable.options");
exports.DraggableDefaultOptions = draggable_options_1.DefaultOptions;
var container_options_1 = require("./model/container.options");
exports.ContainerDefaultOptions = container_options_1.DefaultOptions;
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