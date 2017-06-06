"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_service_1 = require("../services/drag.service");
var draggable_base_1 = require("./draggable.base");
var container_options_1 = require("../model/container.options");
var DraggableChild = (function (_super) {
    __extends(DraggableChild, _super);
    function DraggableChild(service, parent, nativeElement) {
        var _this = _super.call(this, service) || this;
        _this.parent = parent;
        _this.nativeElement = nativeElement;
        return _this;
    }
    return DraggableChild;
}(draggable_base_1.Draggable));
var ContainerDirective = (function () {
    function ContainerDirective(elementRef, dragService, viewContainerRef, componentFactoryResolver) {
        var _this = this;
        this.elementRef = elementRef;
        this.dragService = dragService;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.children = [];
        if (!this.options)
            this.options = container_options_1.DefaultOptions;
        var onDragStartSub = this.dragService
            .onDragStart()
            .subscribe(function (draggable) { });
        var onDragEndSub = this.dragService
            .onDragEnd()
            .subscribe(function (draggable) {
            if (draggable instanceof DraggableChild && draggable.parent === _this) {
                _this.onChildDrop(draggable);
            }
            else if (_this.isTarget && !_this.options.isDisabled) {
                _this.onDrop(draggable);
            }
        });
        this.subscriptions = [onDragStartSub, onDragEndSub];
    }
    Object.defineProperty(ContainerDirective.prototype, "nativeElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    ContainerDirective.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = container_options_1.DefaultOptions;
    };
    ContainerDirective.prototype.ngOnChanges = function () {
        if (!this.options)
            this.options = container_options_1.DefaultOptions;
    };
    ContainerDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ContainerDirective.prototype.dragenter = function () {
        this.onDragEnter();
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
        var next = draggable.nativeElement.cloneNode(true);
        this.initClone(next, draggable.model);
        this.dragService.drop(draggable, this);
    };
    ContainerDirective.prototype.initClone = function (next, model) {
        var _this = this;
        this.children.push({ node: next, model: model });
        var nextDraggable = new DraggableChild(this.dragService, this, next);
        nextDraggable.model = next;
        next.ondragstart = function () { return nextDraggable.startDrag(); };
        next.ondragend = function () { return nextDraggable.endDrag(); };
        next.ondragenter = function () { _this.dragenter(); };
        next.ondragleave = function () { _this.dragleave(); };
        this.nativeElement.appendChild(next);
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
    ContainerDirective.prototype.onDragEnter = function () {
        this.isTarget = true;
        this.nativeElement.classList.add("fren-hover");
    };
    ContainerDirective.prototype.onDragLeave = function () {
        this.isTarget = false;
        this.nativeElement.classList.remove("fren-hover");
    };
    ContainerDirective.startChildDrag = function (element, dragService) {
        dragService.startDrag(element);
    };
    ContainerDirective.endChildDrag = function (element, dragService) {
        dragService.endDrag(element);
    };
    return ContainerDirective;
}());
__decorate([
    core_1.Input("options"),
    __metadata("design:type", Object)
], ContainerDirective.prototype, "options", void 0);
__decorate([
    core_1.HostListener('dragenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    __metadata("design:paramtypes", [core_1.ElementRef,
        drag_service_1.DragService,
        core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver])
], ContainerDirective);
exports.ContainerDirective = ContainerDirective;
//# sourceMappingURL=container.directive.js.map