"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RecaptchaComponent = /** @class */ (function () {
    function RecaptchaComponent(_element, _ngZone) {
        this.isRequired = false;
        this.resolved = new core_1.EventEmitter();
        this.expired = new core_1.EventEmitter();
        this.ngZone = _ngZone;
    }
    RecaptchaComponent.prototype.ngOnInit = function () {
        this.registerRecaptchaOnload();
        this.addRecaptchaScript();
    };
    RecaptchaComponent.prototype.ngOnDestroy = function () {
    };
    RecaptchaComponent.prototype.registerRecaptchaOnload = function () {
        var _this = this;
        window.recaptchaOnload = function () {
            var params = __assign({}, _this.config, { 'sitekey': _this.sitekey, 'callback': _this.recaptchaResolved.bind(_this), 'expired-callback': _this.recaptchaExpired.bind(_this) });
            grecaptcha.render('g-recaptcha', params);
        };
    };
    RecaptchaComponent.prototype.recaptchaResolved = function (evt) {
        var _this = this;
        this.ngZone.run(function () {
            _this.resolved.emit(evt);
        });
    };
    RecaptchaComponent.prototype.recaptchaExpired = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.expired.emit(true);
        });
    };
    RecaptchaComponent.prototype.recaptchaReset = function () {
        grecaptcha.reset();
    };
    RecaptchaComponent.prototype.addRecaptchaScript = function () {
        var script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RecaptchaComponent.prototype, "sitekey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RecaptchaComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RecaptchaComponent.prototype, "rewidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RecaptchaComponent.prototype, "reheight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RecaptchaComponent.prototype, "isRequired", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecaptchaComponent.prototype, "resolved", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecaptchaComponent.prototype, "expired", void 0);
    RecaptchaComponent = __decorate([
        core_1.Component({
            selector: 'recaptcha-component',
            template: '<div id="g-recaptcha" [class.required]="isRequired" [style.width]="rewidth" [style.height]="reheight"></div>',
            styles: ["div.required {\n    border: 1px solid red;\n  }"]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
    ], RecaptchaComponent);
    return RecaptchaComponent;
}());
exports.RecaptchaComponent = RecaptchaComponent;
