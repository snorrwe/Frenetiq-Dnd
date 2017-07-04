"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_service_1 = require("../services/drag.service");
var draggable_clone_1 = require("./container/draggable-clone");
var container_options_1 = require("../model/container.options");
var container_base_1 = require("./container.base");
var DragEventType;
(function (DragEventType) {
    DragEventType[DragEventType["Enter"] = 0] = "Enter";
    DragEventType[DragEventType["Leave"] = 1] = "Leave";
})(DragEventType = exports.DragEventType || (exports.DragEventType = {}));
var ContainerDirective = (function (_super) {
    __extends(ContainerDirective, _super);
    function ContainerDirective(elementRef, dragService) {
        var _this = _super.call(this, elementRef, dragService) || this;
        _this.children = [];
        _this.eventQueue = [];
        if (!_this.options)
            _this.options = container_options_1.DefaultOptions;
        _this.onDropEmitter = new core_1.EventEmitter();
        var onDragStartSub = _this.subscribeToDragStart();
        var onDragEndSub = _this.subscribeToDragEnd();
        _this.subscriptions = [onDragStartSub, onDragEndSub];
        return _this;
    }
    ContainerDirective.prototype.subscribeToDragStart = function () {
        return this.dragService
            .onDragStart()
            .subscribe(function (draggable) { });
    };
    ContainerDirective.prototype.subscribeToDragEnd = function () {
        var _this = this;
        return this.dragService
            .onDragEnd()
            .subscribe(function (draggable) {
            if (draggable.parent === _this) {
                _this.onChildDrop(draggable);
            }
            else if (_this.isTarget && !_this.options.isDisabled) {
                _this.onDrop(draggable);
            }
        });
    };
    ContainerDirective.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = container_options_1.DefaultOptions;
    };
    ContainerDirective.prototype.ngOnChanges = function () {
        if (!this.options)
            this.options = container_options_1.DefaultOptions;
    };
    ContainerDirective.prototype.ngOnDestroy = function () {
        this.subscriptions
            .forEach(function (sub) {
            sub.unsubscribe();
        });
        this.isLooping = false;
    };
    ContainerDirective.prototype.dragover = function (event) {
        this.eventQueue.push({ type: DragEventType.Enter, event: event });
        if (!this.isLooping) {
            this.startEventLoop();
        }
        event.preventDefault();
        event.stopPropagation();
    };
    ContainerDirective.prototype.dragenter = function (event) {
        //This is required for dragover to work in IE
    };
    ContainerDirective.prototype.dragleave = function () {
        this.eventQueue.push({ type: DragEventType.Leave, event: undefined });
        event.preventDefault();
        event.stopPropagation();
    };
    ContainerDirective.prototype.initClone = function (draggable) {
        var clone = new draggable_clone_1.DraggableClone(draggable, this.dragService, this);
        var node = clone.nativeElement;
        clone.model = node;
        node.draggable = this.options.areChildrenDraggable;
        if (node.draggable) {
            node.ondragstart = function (event) { return clone.startDrag(event); };
            node.ondragend = function (event) { return clone.endDrag(event); };
        }
        this.children.push({ node: node, model: draggable.model });
        this.nativeElement.appendChild(node);
    };
    ContainerDirective.prototype.onChildDrop = function (draggable) {
        if (!this.isTarget) {
            var childIndex_1;
            var child = this.children.find(function (item, index) {
                childIndex_1 = index;
                var result = item.node === draggable.nativeElement;
                return result;
            });
            if (child) {
                this.children.splice(childIndex_1, 1);
                this.nativeElement.removeChild(child.node);
            }
        }
    };
    ContainerDirective.prototype.onDrop = function (draggable) {
        if (!draggable) {
            console.warn("onDrop called without draggable!");
            return;
        }
        if (!this.options.isCloningDisabled) {
            this.initClone(draggable);
        }
        this.dragleave();
        this.dragService.drop(draggable, this);
        this.onDropEmitter.emit({ draggable: draggable, container: this });
    };
    return ContainerDirective;
}(container_base_1.ContainerBase));
__decorate([
    core_1.Input("options"),
    __metadata("design:type", Object)
], ContainerDirective.prototype, "options", void 0);
__decorate([
    core_1.Output("onDrop"),
    __metadata("design:type", core_1.EventEmitter)
], ContainerDirective.prototype, "onDropEmitter", void 0);
__decorate([
    core_1.HostListener('dragover', ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ContainerDirective.prototype, "dragover", null);
__decorate([
    core_1.HostListener('dragenter', ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ContainerDirective.prototype, "dragenter", null);
__decorate([
    core_1.HostListener('dragleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContainerDirective.prototype, "dragleave", null);
ContainerDirective = __decorate([
    core_1.Directive({
        selector: '[frenetiq-container]',
        exportAs: 'frenetiq-container'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, drag_service_1.DragService])
], ContainerDirective);
exports.ContainerDirective = ContainerDirective;
//# sourceMappingURL=container.directive.js.map