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
    var AIKeyboard = (function (_super) {
        __extends(AIKeyboard, _super);
        function AIKeyboard() {
            var _this = _super.call(this) || this;
            if (AIKeyboard._instance != null)
                throw new Error("AIKeyboard为单例！！");
            _this.name = "Keyboard";
            AIKeyboard._instance = _this;
            _this.initilize();
            return _this;
        }
        Object.defineProperty(AIKeyboard, "instance", {
            get: function () {
                if (this._instance == null)
                    this._instance = new AIKeyboard();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        AIKeyboard.prototype.initilize = function () {
            if (window.addEventListener) {
                window.addEventListener("keydown", this.onKeyEvent.bind(this), true);
                window.addEventListener("keyup", this.onKeyEvent.bind(this), true);
            }
        };
        AIKeyboard.prototype.onKeyEvent = function (event) {
            this._isCtrl = event.ctrlKey;
            this._isShift = event.shiftKey;
            this._type = event.type;
            this._keyIdentifier = event.keyIdentifier;
            this._charCode = event.charCode;
            this._keyCode = event.keyCode;
            this._event = event;
            switch (event.type) {
                case "keydown":
                    this._isKeyDown = true;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onkeyDown, { key: this._keyCode }));
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAnykeyDown));
                    break;
                case "keyup":
                    this._isKeyDown = false;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onkeyReleased, { key: this._keyCode }));
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAnykeyReleased));
                    break;
            }
        };
        AIKeyboard.prototype.keyIsDown = function (event) {
            return { instances: [this], status: this._isKeyDown && ls.eval_e(event.key) == this._keyCode };
        };
        AIKeyboard.prototype.onkeyDown = function (event) {
            return { instances: [this], status: event.getStatus("key") };
        };
        AIKeyboard.prototype.onkeyReleased = function (event) {
            return { instances: [this], status: event.getStatus("key") };
        };
        AIKeyboard.prototype.onAnykeyDown = function (event) {
            return { instances: [this], status: true };
        };
        AIKeyboard.prototype.onAnykeyReleased = function (event) {
            return { instances: [this], status: true };
        };
        Object.defineProperty(AIKeyboard.prototype, "keyCode", {
            get: function () {
                return 'which' in this._event ? this._event.which : this._event.keyCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIKeyboard.prototype, "isCtrl", {
            get: function () {
                return this._isCtrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIKeyboard.prototype, "isShift", {
            get: function () {
                return this._isShift;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIKeyboard.prototype, "isKeyDown", {
            get: function () {
                return this._isKeyDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIKeyboard.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIKeyboard.prototype, "keyIdentifier", {
            get: function () {
                return this._keyIdentifier;
            },
            enumerable: true,
            configurable: true
        });
        return AIKeyboard;
    }(ls.AIObject));
    ls.AIKeyboard = AIKeyboard;
    __reflect(AIKeyboard.prototype, "ls.AIKeyboard");
    var KeyIsDownEvent = (function (_super) {
        __extends(KeyIsDownEvent, _super);
        function KeyIsDownEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return KeyIsDownEvent;
    }(ls.BaseEvent));
    ls.KeyIsDownEvent = KeyIsDownEvent;
    __reflect(KeyIsDownEvent.prototype, "ls.KeyIsDownEvent");
    var OnKeyDownEvent = (function (_super) {
        __extends(OnKeyDownEvent, _super);
        function OnKeyDownEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnKeyDownEvent;
    }(ls.BaseEvent));
    ls.OnKeyDownEvent = OnKeyDownEvent;
    __reflect(OnKeyDownEvent.prototype, "ls.OnKeyDownEvent");
    var OnKeyReleasedEvent = (function (_super) {
        __extends(OnKeyReleasedEvent, _super);
        function OnKeyReleasedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnKeyReleasedEvent;
    }(ls.BaseEvent));
    ls.OnKeyReleasedEvent = OnKeyReleasedEvent;
    __reflect(OnKeyReleasedEvent.prototype, "ls.OnKeyReleasedEvent");
    var OnAnyKeyDownEvent = (function (_super) {
        __extends(OnAnyKeyDownEvent, _super);
        function OnAnyKeyDownEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnAnyKeyDownEvent;
    }(ls.BaseEvent));
    ls.OnAnyKeyDownEvent = OnAnyKeyDownEvent;
    __reflect(OnAnyKeyDownEvent.prototype, "ls.OnAnyKeyDownEvent");
    var OnAnyKeyReleasedEvent = (function (_super) {
        __extends(OnAnyKeyReleasedEvent, _super);
        function OnAnyKeyReleasedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnAnyKeyReleasedEvent;
    }(ls.BaseEvent));
    ls.OnAnyKeyReleasedEvent = OnAnyKeyReleasedEvent;
    __reflect(OnAnyKeyReleasedEvent.prototype, "ls.OnAnyKeyReleasedEvent");
})(ls || (ls = {}));
