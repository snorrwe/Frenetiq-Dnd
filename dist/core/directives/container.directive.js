"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_service_1 = require("../services/drag.service");
var draggable_base_1 = require("./draggable.base");
var ngx_frenetiq_dnd_1 = require("../ngx-frenetiq-dnd");
var DraggableClone = (function (_super) {
    __extends(DraggableClone, _super);
    function DraggableClone(draggable, service, parent) {
        var _this = _super.call(this, service) || this;
        _this.parent = parent;
        _this._options = draggable.options;
        _this._nativeElement = draggable.nativeElement.cloneNode(true);
        return _this;
    }
    Object.defineProperty(DraggableClone.prototype, "nativeElement", {
        get: function () { return this._nativeElement; },
        enumerable: true,
        configurable: true
    });
    return DraggableClone;
}(draggable_base_1.Draggable));
exports.DraggableClone = DraggableClone;
var ContainerDirective = (function () {
    function ContainerDirective(elementRef, dragService) {
        this.elementRef = elementRef;
        this.dragService = dragService;
        this.children = [];
        if (!this.options)
            this.options = ngx_frenetiq_dnd_1.ContainerDefaultOptions;
        this.onDropEmitter = new core_1.EventEmitter();
        var onDragStartSub = this.subscribeToDragStart();
        var onDragEndSub = this.subscribeToDragEnd();
        this.subscriptions = [onDragStartSub, onDragEndSub];
    }
    Object.defineProperty(ContainerDirective.prototype, "nativeElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
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
            this.options = ngx_frenetiq_dnd_1.ContainerDefaultOptions;
    };
    ContainerDirective.prototype.ngOnChanges = function () {
        if (!this.options)
            this.options = ngx_frenetiq_dnd_1.ContainerDefaultOptions;
    };
    ContainerDirective.prototype.ngOnDestroy = function () {
        this.subscriptions
            .forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ContainerDirective.prototype.dragover = function (event) {
        this.onDragOver(event);
    };
    ContainerDirective.prototype.dragleave = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.onDragLeave();
        });
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
    ContainerDirective.prototype.initClone = function (draggable) {
        var clone = new DraggableClone(draggable, this.dragService, this);
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
    ContainerDirective.prototype.onDragOver = function (event) {
        var _this = this;
        var keys;
        if (this.options && this.options.enabledContainers) {
            var allKeys = Object.keys(this.options.enabledContainers);
            keys = allKeys
                .map(function (key) {
                return {
                    key: key,
                    value: _this.options.enabledContainers[key]
                };
            });
        }
        if (this.dragService.isContainerValid(keys)) {
            event.preventDefault();
            this.isTarget = true;
            this.dragService.enterDrag(this);
            this.nativeElement.classList.add("fren-hover");
        }
    };
    ContainerDirective.prototype.onDragLeave = function () {
        this.isTarget = false;
        this.dragService.leaveDrag();
        this.nativeElement.classList.remove("fren-hover");
    };
    return ContainerDirective;
}());
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
    __metadata("design:paramtypes", [core_1.ElementRef,
        drag_service_1.DragService])
], ContainerDirective);
exports.ContainerDirective = ContainerDirective;
//# sourceMappingURL=container.directive.js.map