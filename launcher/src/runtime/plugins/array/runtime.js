var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ls;
(function (ls) {
    var AIArray = (function (_super) {
        __extends(AIArray, _super);
        function AIArray() {
            var _this = _super.call(this) || this;
            _this._arrCache = [];
            _this._arr = [];
            _this._isCreateArray = false;
            _this.curX = 0;
            _this.curY = 0;
            _this.curZ = 0;
            _this.curValue = 0;
            return _this;
        }
        AIArray.prototype.initialize = function () {
            this.setArraySize(this.arr_width, this.arr_height, this.arr_depth);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onArrayCreated));
        };
        Object.defineProperty(AIArray.prototype, "width", {
            get: function () {
                return this.arr_width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIArray.prototype, "height", {
            get: function () {
                return this.arr_height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIArray.prototype, "depth", {
            get: function () {
                return this.arr_depth;
            },
            enumerable: true,
            configurable: true
        });
        AIArray.prototype.isOutOfRange = function (xIndex, yIndex, zIndex) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return true;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return true;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return true;
            return false;
        };
        AIArray.prototype.at = function (xIndex, yIndex, zIndex) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return 0;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return 0;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return 0;
            return this._arr[xIndex][yIndex][zIndex];
        };
        AIArray.prototype.setArrayValue = function (xIndex, yIndex, zIndex, value) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return;
            this._arr[xIndex][yIndex][zIndex] = value;
        };
        AIArray.prototype.compareValues = function (va, vb) {
            if (ls.is_number(va) && ls.is_number(vb)) {
                return va - vb;
            }
            else {
                var sa = "" + va;
                var sb = "" + vb;
                if (sa < sb)
                    return -1;
                else if (sa > sb)
                    return 1;
                return 0;
            }
        };
        AIArray.prototype.onForEachArrayElement = function ($event) {
            this.arr_width = this.arr_width || 0;
            this.arr_height = this.arr_height || 0;
            this.arr_depth = this.arr_depth || 0;
            $event.array = this;
            return { instances: [this], status: this.arr_width > 0 || this.arr_height > 0 || this.arr_depth > 0, data: $event };
        };
        AIArray.prototype.compareXDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, 0, 0);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, 0, 0), $event.operationType, $event.value) };
        };
        AIArray.prototype.compareXYDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, $event.yDimention, 0);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, $event.yDimention, 0), $event.operationType, $event.value) };
        };
        AIArray.prototype.compareXYZDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, $event.yDimention, $event.zDimention);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, $event.yDimention, $event.zDimention), $event.operationType, $event.value) };
        };
        AIArray.prototype.compareArraySize = function ($event) {
            var s = 0;
            switch ($event.xyzDimention) {
                case 1:
                    s = this.arr_width;
                    break;
                case 2:
                    s = this.arr_height;
                    break;
                case 3:
                    s = this.arr_depth;
                    break;
            }
            return { instances: [this], status: ls.compare(s, $event.operationType, $event.value) };
        };
        AIArray.prototype.containsValue = function ($event) {
            var value = $event.value;
            for (var i = 0; i < this.arr_width; i++) {
                for (var j = 0; j < this.arr_height; j++) {
                    for (var k = 0; k < this.arr_depth; k++) {
                        var curValue = this.at(i, j, k);
                        if (curValue === value)
                            return { instances: [this], status: true };
                    }
                }
            }
            return { instances: [this], status: false };
        };
        AIArray.prototype.checkArrayIsEmpty = function ($event) {
            return { instances: [this], status: this.arr_width === 0 || this.arr_height === 0 || this.arr_depth === 0 };
        };
        AIArray.prototype.compareCurrentValue = function ($event) {
            var isOutRange = this.isOutOfRange(this.curX, this.curY, this.curZ);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at(this._arr[this.curX], this._arr[this.curY], this._arr[this.curZ]), $event.operationType, $event.value) };
        };
        AIArray.prototype.onArrayCreated = function ($event) {
            return { instances: [this], status: true };
        };
        AIArray.prototype.onArrayDestroyed = function ($event) {
            return { instances: [this], status: true };
        };
        AIArray.prototype.clearArray = function () {
            for (var i = 0; i < this.arr_width; i++) {
                for (var j = 0; j < this.arr_height; j++) {
                    for (var k = 0; k < this.arr_depth; k++) {
                        this._arr[i][j][k] = 0;
                    }
                }
            }
        };
        AIArray.prototype.setXDimentionValue = function (xIndex, value) {
            xIndex = ls.eval_e(xIndex);
            ls.assert(typeof xIndex !== "number", "AIArray setXDimentionValue parameter type incorrect!!");
            this.setArrayValue(xIndex, 0, 0, ls.eval_e(value));
        };
        AIArray.prototype.setXYDimentionValue = function (xIndex, yIndex, value) {
            xIndex = ls.eval_e(xIndex);
            yIndex = ls.eval_e(yIndex);
            ls.assert(typeof xIndex !== "number" || typeof yIndex !== "number", "AIArray setXYDimentionValue parameter type incorrect!!");
            this.setArrayValue(xIndex, yIndex, 0, ls.eval_e(value));
        };
        AIArray.prototype.setXYZDimentionValue = function (xIndex, yIndex, zIndex, value) {
            xIndex = ls.eval_e(xIndex);
            yIndex = ls.eval_e(yIndex);
            zIndex = ls.eval_e(zIndex);
            ls.assert(typeof xIndex !== "number" || typeof yIndex !== "number" || typeof zIndex !== "number", "AIArray setXYZDimentionValue parameter type incorrect!!");
            this.setArrayValue(xIndex, yIndex, zIndex, ls.eval_e(value));
        };
        AIArray.prototype.setArraySize = function (width, height, depth) {
            width = Math.floor(ls.eval_e(width));
            height = Math.floor(ls.eval_e(height));
            depth = Math.floor(ls.eval_e(depth));
            if (width < 0)
                width = 0;
            if (height < 0)
                height = 0;
            if (depth < 0)
                depth = 0;
            if (this.arr_width === width && this.arr_height === height && this.arr_depth === depth && this._isCreateArray)
                return;
            this.arr_width = width;
            this.arr_height = height;
            this.arr_depth = depth;
            var a = this._arr;
            a.length = width;
            for (var x = 0; x < this.arr_width; x++) {
                a[x] = [];
                a[x].length = height;
                for (var y = 0; y < this.arr_height; y++) {
                    a[x][y] = [];
                    a[x][y].length = depth;
                    for (var z = 0; z < this.arr_depth; z++) {
                        a[x][y][z] = 0;
                    }
                }
            }
            this._isCreateArray = true;
        };
        AIArray.prototype.deleteArray = function (index, xyzDimention) {
            index = ls.eval_e(index);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof index !== "number" || typeof dims !== "number", "AIArray deleteArray parameter type incorrect!!");
            if (index < 0)
                return;
            switch (dims) {
                case 1:
                    if (index >= this.arr_width)
                        break;
                    this._arr.splice(index, 1);
                    this.arr_width--;
                    break;
                case 2:
                    if (index >= this.arr_height)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].splice(index, 1);
                    }
                    this.arr_height--;
                    break;
                case 3:
                    if (index >= this.arr_depth)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].splice(index, 1);
                        }
                    }
                    this.arr_depth--;
                    break;
            }
        };
        AIArray.prototype.insertArray = function (value, index, xyzDimention) {
            value = ls.eval_e(value);
            index = ls.eval_e(index);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof index !== "number" || typeof dims !== "number", "AIArray insertArray parameter type incorrect!!");
            if (index < 0)
                return;
            switch (dims) {
                case 1:
                    if (index > this.arr_width)
                        break;
                    if (this.isOutOfRange(index, 0, 0))
                        break;
                    this._arr.splice(index, 0, []);
                    for (var i = 0; i < this.arr_height; i++) {
                        this._arr[index][i] = [];
                        for (var j = 0; j < this.arr_depth; j++) {
                            this._arr[index][i][j] = value;
                        }
                    }
                    this.arr_width++;
                    break;
                case 2:
                    if (index > this.arr_height)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].splice(index, 0, [[]]);
                        for (var k = 0; k < this.arr_height; k++) {
                            this._arr[i][index][k] = value;
                        }
                    }
                    this.arr_height++;
                    break;
                case 3:
                    if (index > this.arr_depth)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].splice(index, 0, value);
                        }
                    }
                    this.arr_depth++;
                    break;
            }
        };
        AIArray.prototype.popArray = function (where, xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            where = ls.eval_e(where);
            ls.assert(typeof dims !== "number" || typeof where !== "number", "AIArray popArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    if (this.arr_width === 0)
                        break;
                    if (where === 0)
                        this._arr.pop();
                    else
                        this._arr.shift();
                    this.arr_width--;
                    break;
                case 2:
                    if (this.arr_height === 0)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        if (where === 0)
                            this._arr[i].pop();
                        else
                            this._arr[i].shift();
                    }
                    this.arr_height--;
                    break;
                case 3:
                    if (this.arr_depth === 0)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            if (where === 0)
                                this._arr[i][j].pop();
                            else
                                this._arr[i][j].shift();
                        }
                    }
                    this.arr_depth--;
                    break;
            }
        };
        AIArray.prototype.pushArray = function (where, value, xyzDimention) {
            where = ls.eval_e(where);
            value = ls.eval_e(value);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof where !== "number" || typeof dims !== "number", "AIArray pushArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    var pushIndex = 0;
                    if (where === 0) {
                        pushIndex = this.arr_width;
                        this._arr.push([]);
                    }
                    else {
                        pushIndex = 0;
                        this._arr.unshift([]);
                    }
                    for (var j = 0; j < this.arr_height; j++) {
                        this._arr[pushIndex][j] = [];
                        for (var k = 0; k < this.arr_depth; k++) {
                            this._arr[pushIndex][j][k] = value;
                        }
                    }
                    this.arr_width++;
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++) {
                        var pushIndex = 0;
                        if (where === 0) {
                            pushIndex = this.arr_height;
                            this._arr[i].push([]);
                        }
                        else {
                            pushIndex = 0;
                            this._arr[i].unshift([]);
                        }
                        for (var k = 0; k < this.arr_depth; k++) {
                            this._arr[i][pushIndex][k] = value;
                        }
                    }
                    this.arr_height++;
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            if (where === 0)
                                this._arr[i][j].push(value);
                            else
                                this._arr[i][j].unshift(value);
                        }
                    }
                    this.arr_depth++;
                    break;
            }
        };
        AIArray.prototype.reverseArray = function (xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof dims !== "number", "AIArray reverseArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    this._arr.reverse();
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++)
                        this._arr[i].reverse();
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].reverse();
                        }
                    }
                    break;
            }
        };
        AIArray.prototype.sortArray = function (xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof dims !== "number", "AIArray sortArray parameter type incorrect!!");
            if (this.arr_width === 0 || this.arr_height === 0 || this.arr_depth === 0)
                return;
            var self = this;
            switch (dims) {
                case 1:
                    this._arr.sort(function (a, b) {
                        return self.compareValues(a[0][0], b[0][0]);
                    });
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].sort(function (a, b) {
                            return self.compareValues(a[0], b[0]);
                        });
                    }
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].sort(this.compareValues);
                        }
                    }
                    break;
            }
        };
        AIArray.prototype.destroyArray = function () {
            this._arr.length = 0;
            this.arr_width = this.arr_height = this.arr_depth = 0;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onArrayDestroyed));
        };
        AIArray.prototype.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["curX"] = this.curX;
            o["curY"] = this.curY;
            o["curZ"] = this.curZ;
            o["curValue"] = this.curValue;
            o["arr_width"] = this.arr_width;
            o["arr_height"] = this.arr_height;
            o["arr_depth"] = this.arr_depth;
            return o;
        };
        AIArray.prototype.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.curX = o["curX"];
                this.curY = o["curY"];
                this.curZ = o["curZ"];
                this.curValue = o["curValue"];
                this.arr_width = o["arr_width"];
                this.arr_height = o["arr_height"];
                this.arr_depth = o["arr_depth"];
            }
        };
        AIArray.prototype.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.curX = this.curX;
            cl.curY = this.curY;
            cl.curZ = this.curZ;
            cl.curValue = this.curValue;
            cl.arr_width = this.arr_width;
            cl.arr_height = this.arr_height;
            cl.arr_depth = this.arr_depth;
            return cl;
        };
        return AIArray;
    }(ls.AIObject));
    ls.AIArray = AIArray;
    __reflect(AIArray.prototype, "ls.AIArray");
    var CompareXDimentionEvent = (function (_super) {
        __extends(CompareXDimentionEvent, _super);
        function CompareXDimentionEvent() {
            return _super.call(this) || this;
        }
        return CompareXDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXDimentionEvent = CompareXDimentionEvent;
    __reflect(CompareXDimentionEvent.prototype, "ls.CompareXDimentionEvent");
    var CompareXYDimentionEvent = (function (_super) {
        __extends(CompareXYDimentionEvent, _super);
        function CompareXYDimentionEvent() {
            return _super.call(this) || this;
        }
        return CompareXYDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXYDimentionEvent = CompareXYDimentionEvent;
    __reflect(CompareXYDimentionEvent.prototype, "ls.CompareXYDimentionEvent");
    var CompareXYZDimentionEvent = (function (_super) {
        __extends(CompareXYZDimentionEvent, _super);
        function CompareXYZDimentionEvent() {
            return _super.call(this) || this;
        }
        return CompareXYZDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXYZDimentionEvent = CompareXYZDimentionEvent;
    __reflect(CompareXYZDimentionEvent.prototype, "ls.CompareXYZDimentionEvent");
    var CompareArraySizeEvent = (function (_super) {
        __extends(CompareArraySizeEvent, _super);
        function CompareArraySizeEvent() {
            return _super.call(this) || this;
        }
        return CompareArraySizeEvent;
    }(ls.BaseEvent));
    ls.CompareArraySizeEvent = CompareArraySizeEvent;
    __reflect(CompareArraySizeEvent.prototype, "ls.CompareArraySizeEvent");
    var ContainsValueEvent = (function (_super) {
        __extends(ContainsValueEvent, _super);
        function ContainsValueEvent() {
            return _super.call(this) || this;
        }
        return ContainsValueEvent;
    }(ls.BaseEvent));
    ls.ContainsValueEvent = ContainsValueEvent;
    __reflect(ContainsValueEvent.prototype, "ls.ContainsValueEvent");
    var CheckArrayIsEmptyEvent = (function (_super) {
        __extends(CheckArrayIsEmptyEvent, _super);
        function CheckArrayIsEmptyEvent() {
            return _super.call(this) || this;
        }
        return CheckArrayIsEmptyEvent;
    }(ls.BaseEvent));
    ls.CheckArrayIsEmptyEvent = CheckArrayIsEmptyEvent;
    __reflect(CheckArrayIsEmptyEvent.prototype, "ls.CheckArrayIsEmptyEvent");
    var CompareCurrentValueEvent = (function (_super) {
        __extends(CompareCurrentValueEvent, _super);
        function CompareCurrentValueEvent() {
            return _super.call(this) || this;
        }
        return CompareCurrentValueEvent;
    }(ls.BaseEvent));
    ls.CompareCurrentValueEvent = CompareCurrentValueEvent;
    __reflect(CompareCurrentValueEvent.prototype, "ls.CompareCurrentValueEvent");
    var OnArrayCreatedEvent = (function (_super) {
        __extends(OnArrayCreatedEvent, _super);
        function OnArrayCreatedEvent() {
            return _super.call(this) || this;
        }
        return OnArrayCreatedEvent;
    }(ls.BaseEvent));
    ls.OnArrayCreatedEvent = OnArrayCreatedEvent;
    __reflect(OnArrayCreatedEvent.prototype, "ls.OnArrayCreatedEvent");
    var OnArrayDestroyedEvent = (function (_super) {
        __extends(OnArrayDestroyedEvent, _super);
        function OnArrayDestroyedEvent() {
            return _super.call(this) || this;
        }
        return OnArrayDestroyedEvent;
    }(ls.BaseEvent));
    ls.OnArrayDestroyedEvent = OnArrayDestroyedEvent;
    __reflect(OnArrayDestroyedEvent.prototype, "ls.OnArrayDestroyedEvent");
})(ls || (ls = {}));
