"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_service_1 = require("../services/drag.service");
var draggable_options_1 = require("../model/draggable.options");
var draggable_base_1 = require("./draggable.base");
var DraggableDirective = (function (_super) {
    __extends(DraggableDirective, _super);
    function DraggableDirective(elementRef, viewContainer, dragService) {
        var _this = _super.call(this, dragService) || this;
        _this.elementRef = elementRef;
        _this.viewContainer = viewContainer;
        if (!_this.options)
            _this.options = draggable_options_1.DefaultOptions;
        return _this;
    }
    Object.defineProperty(DraggableDirective.prototype, "nativeElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    DraggableDirective.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = draggable_options_1.DefaultOptions;
        this.elementRef.nativeElement.draggable = !this.options.isDisabled;
        this.elementRef.nativeElement.style.display = "block";
    };
    DraggableDirective.prototype.ngOnChanges = function () {
        if (!this.options)
            this.options = draggable_options_1.DefaultOptions;
        this.elementRef.nativeElement.draggable = !this.options.isDisabled;
    };
    DraggableDirective.prototype.startDrag = function () {
        this.nativeElement.classList.add("fren-dragging");
        _super.prototype.startDrag.call(this);
    };
    DraggableDirective.prototype.endDrag = function () {
        this.nativeElement.classList.remove("fren-dragging");
        _super.prototype.endDrag.call(this);
    };
    return DraggableDirective;
}(draggable_base_1.Draggable));
__decorate([
    core_1.Input("options"),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "options", void 0);
__decorate([
    core_1.Input("drag-model"),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "model", void 0);
__decorate([
    core_1.HostListener("dragstart"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DraggableDirective.prototype, "startDrag", null);
__decorate([
    core_1.HostListener("dragend"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DraggableDirective.prototype, "endDrag", null);
DraggableDirective = __decorate([
    core_1.Directive({
        selector: '[frenetiq-draggable]',
        exportAs: 'frenetiq-draggable'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ViewContainerRef,
        drag_service_1.DragService])
], DraggableDirective);
exports.DraggableDirective = DraggableDirective;
//# sourceMappingURL=draggable.directive.js.map