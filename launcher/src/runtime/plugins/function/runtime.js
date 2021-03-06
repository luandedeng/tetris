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
    var AIFunction = (function (_super) {
        __extends(AIFunction, _super);
        function AIFunction() {
            var _this = _super.call(this) || this;
            _this.funcStacks = {};
            if (AIFunction._instance != null) {
                throw new Error("AIFunction 为单例！！！");
            }
            _this.name = "Function";
            AIFunction._instance = _this;
            return _this;
        }
        Object.defineProperty(AIFunction, "instance", {
            get: function () {
                if (this._instance == null)
                    this._instance = new AIFunction();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        AIFunction.prototype.getCurrentFunc = function (tag) {
            if (tag == null) {
                ls.assert(true, "调用的函数名不能为空！！！");
                return;
            }
            var fs;
            if (this.funcStacks[tag] == null) {
                var fs = new FuncStackEntry();
                this.funcStacks[tag] = fs;
            }
            return this.funcStacks[tag];
        };
        AIFunction.prototype.compareParameter = function (compareParameterEvent) {
            var fs = this.getCurrentFunc(compareParameterEvent.tag);
            if (!fs)
                return { instances: [this], status: false };
            var index = ls.eval_e(compareParameterEvent.index);
            if (index < 0 || index >= fs.params.length)
                return { instances: [this], status: false };
            return { instances: [this], status: ls.compare(fs.params[index], compareParameterEvent.operationType, compareParameterEvent.value) };
        };
        AIFunction.prototype.onFunction = function (event) {
            return { instances: [this], status: event.getStatus("tag") };
        };
        AIFunction.prototype.callExpression = function (expression) {
        };
        AIFunction.prototype.callFunction = function (tag, params) {
            var _params;
            if (params !== undefined && params !== null) {
                var paramsStr = params.toString();
                if (paramsStr.indexOf(',') != -1)
                    _params = params.split(",");
                else
                    _params = [params];
            }
            var fs = this.getCurrentFunc(tag);
            fs.tag = tag;
            fs.retVal = 0;
            fs.params = (params !== undefined && params !== null) ? _params : [];
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFunction, { tag: tag }));
        };
        AIFunction.prototype.setReturnValue = function (tag, value) {
            var fs = this.getCurrentFunc(tag);
            if (fs)
                fs.retVal = ls.eval_e(value);
        };
        AIFunction.prototype.param = function (tag, index) {
            var index = Math.floor(index);
            var fs = this.getCurrentFunc(tag);
            if (fs) {
                if (index < 0 || index > fs.params.length)
                    return 0;
                return fs.params[index];
            }
            return 0;
        };
        AIFunction.prototype.call = function (tag) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var fs = this.getCurrentFunc(tag);
            fs.params.length = 0;
            fs.params = fs.params.concat(args);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFunction, { tag: tag }));
        };
        AIFunction.prototype.loadFromJSON = function (o) {
        };
        AIFunction.prototype.saveToJSON = function () {
        };
        return AIFunction;
    }(ls.AIObject));
    ls.AIFunction = AIFunction;
    __reflect(AIFunction.prototype, "ls.AIFunction");
    var FuncStackEntry = (function () {
        function FuncStackEntry() {
            this.retVal = 0;
            this.params = [];
        }
        return FuncStackEntry;
    }());
    __reflect(FuncStackEntry.prototype, "FuncStackEntry");
    var CompareParameterEvent = (function (_super) {
        __extends(CompareParameterEvent, _super);
        function CompareParameterEvent() {
            return _super.call(this) || this;
        }
        return CompareParameterEvent;
    }(ls.BaseEvent));
    ls.CompareParameterEvent = CompareParameterEvent;
    __reflect(CompareParameterEvent.prototype, "ls.CompareParameterEvent");
    var OnFunctionCallEvent = (function (_super) {
        __extends(OnFunctionCallEvent, _super);
        function OnFunctionCallEvent() {
            return _super.call(this) || this;
        }
        return OnFunctionCallEvent;
    }(ls.BaseEvent));
    ls.OnFunctionCallEvent = OnFunctionCallEvent;
    __reflect(OnFunctionCallEvent.prototype, "ls.OnFunctionCallEvent");
})(ls || (ls = {}));
