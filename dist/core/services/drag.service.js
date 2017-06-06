"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var DragService = (function () {
    function DragService() {
        this.onDragStartSubj = new Rx_1.Subject();
        this.onDragEndSubj = new Rx_1.Subject();
        this.onDropSubj = new Rx_1.Subject();
    }
    DragService.prototype.drop = function (draggable, container) {
        this.onDropSubj.next({ draggable: draggable, container: container });
    };
    DragService.prototype.startDrag = function (draggable) {
        this.current = draggable;
        this.onDragStartSubj.next(draggable);
    };
    DragService.prototype.endDrag = function (draggable) {
        delete this.current;
        this.onDragEndSubj.next(draggable);
    };
    DragService.prototype.onDrop = function () {
        return this.onDropSubj.asObservable();
    };
    DragService.prototype.onDragStart = function () {
        return this.onDragStartSubj.asObservable();
    };
    DragService.prototype.onDragEnd = function () {
        return this.onDragEndSubj.asObservable();
    };
    return DragService;
}());
DragService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DragService);
exports.DragService = DragService;
//# sourceMappingURL=drag.service.js.map