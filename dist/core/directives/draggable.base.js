"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var draggable_options_1 = require("../model/draggable.options");
var Draggable = (function () {
    function Draggable(dragService) {
        this.dragService = dragService;
        if (!this.options)
            this.options = draggable_options_1.DefaultOptions;
    }
    Object.defineProperty(Draggable.prototype, "model", {
        get: function () { return this._model; },
        set: function (value) { this._model = value; },
        enumerable: true,
        configurable: true
    });
    Draggable.prototype.startDrag = function () {
        this.dragService.startDrag(this);
    };
    Draggable.prototype.endDrag = function () {
        this.dragService.endDrag(this);
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.base.js.map