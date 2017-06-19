"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_frenetiq_dnd_1 = require("../ngx-frenetiq-dnd");
var Draggable = (function () {
    function Draggable(dragService) {
        this.dragService = dragService;
        if (!this._options)
            this._options = ngx_frenetiq_dnd_1.DraggableDefaultOptions;
    }
    Object.defineProperty(Draggable.prototype, "options", {
        get: function () { return this._options; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Draggable.prototype, "model", {
        get: function () { return this._model; },
        set: function (value) { this._model = value; },
        enumerable: true,
        configurable: true
    });
    Draggable.prototype.startDrag = function (event) {
        if (this.nativeElement) {
            this.nativeElement.classList.add("fren-dragging");
        }
        this.dragService.startDrag(this, this._options.enabledContainers);
    };
    Draggable.prototype.endDrag = function (event) {
        event.cancelBubble = true;
        if (this.nativeElement) {
            this.nativeElement.classList.remove("fren-dragging");
        }
        this.dragService.endDrag(this);
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.base.js.map