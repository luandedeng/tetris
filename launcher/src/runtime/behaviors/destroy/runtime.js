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
    var DestoryOutsideLayoutBehaivor = (function (_super) {
        __extends(DestoryOutsideLayoutBehaivor, _super);
        function DestoryOutsideLayoutBehaivor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 1;
            return _this;
        }
        DestoryOutsideLayoutBehaivor.prototype.onCreate = function () {
            this.type = ls.eval_e(this.type);
        };
        DestoryOutsideLayoutBehaivor.prototype.tick = function () {
            if (this.inst.exsitOnScreen === undefined && this.inst.isOnScreen)
                this.inst.exsitOnScreen = true;
            if (!this.inst.isOnScreen) {
                switch (this.type) {
                    case 1:
                        this.inst.destory();
                        break;
                    case 2:
                        if (this.inst.exsitOnScreen)
                            this.inst.destory();
                        break;
                }
            }
        };
        DestoryOutsideLayoutBehaivor.prototype.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.type = this.type;
            return o;
        };
        DestoryOutsideLayoutBehaivor.prototype.loadFromJSON = function (o) {
            if (o) {
                this.type = o.type;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        DestoryOutsideLayoutBehaivor.prototype.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.type = this.type;
            return bh;
        };
        return DestoryOutsideLayoutBehaivor;
    }(ls.BaseBehavior));
    ls.DestoryOutsideLayoutBehaivor = DestoryOutsideLayoutBehaivor;
    __reflect(DestoryOutsideLayoutBehaivor.prototype, "ls.DestoryOutsideLayoutBehaivor");
})(ls || (ls = {}));
