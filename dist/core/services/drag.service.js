"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var DragService = (function () {
    function DragService() {
        this.onDragStartSubj = new Rx_1.Subject();
        this.onDragEndSubj = new Rx_1.Subject();
        this.onMissSubj = new Rx_1.Subject();
        this.onDropSubj = new Rx_1.Subject();
    }
    /**
    * Checks if any of the given key-value pairs is a valid container
    * Where key is the name of the container and value is if it is enabled
    */
    DragService.prototype.isContainerValid = function (containers) {
        if (!containers || !containers.length) {
            return true;
        }
        for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
            var container = containers_1[_i];
            if (container.value && this.validContainers[container.key]) {
                return true;
            }
        }
        return false;
    };
    /**
    * Fires an onDrop event with the passed parameters
    */
    DragService.prototype.drop = function (draggable, container) {
        this.onDropSubj.next({ draggable: draggable, container: container });
    };
    /**
    * Updates the current target container with the given container
    */
    DragService.prototype.enterDrag = function (container) {
        this.currentTarget = container;
    };
    /**
    * Removes the current target container
    */
    DragService.prototype.leaveDrag = function () {
        this.currentTarget = null;
    };
    /**
    * Starts the drag process
    */
    DragService.prototype.startDrag = function (draggable, validContainers) {
        this.current = draggable;
        this.validContainers = validContainers || {};
        this.onDragStartSubj.next(draggable);
    };
    /**
    * Ends the drag process
    */
    DragService.prototype.endDrag = function (draggable) {
        this.onDragEndSubj.next(draggable);
        if (!this.currentTarget) {
            this.onMissSubj.next(draggable);
        }
        delete this.current;
        delete this.currentTarget;
    };
    /**
    * Fired when draggable is dropped on a container
    */
    DragService.prototype.onDrop = function () {
        return this.onDropSubj.asObservable();
    };
    /**
    * Fired when the drag process begins
    */
    DragService.prototype.onDragStart = function () {
        return this.onDragStartSubj.asObservable();
    };
    /**
    * Fired when the drag process ends
    */
    DragService.prototype.onDragEnd = function () {
        return this.onDragEndSubj.asObservable();
    };
    /**
    * Fired when the drag process ends over no - or an invalid - container
    */
    DragService.prototype.onMiss = function () {
        return this.onMissSubj.asObservable();
    };
    return DragService;
}());
DragService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DragService);
exports.DragService = DragService;
//# sourceMappingURL=drag.service.js.map