"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let RecaptchaComponent = class RecaptchaComponent {
    constructor(_element, _ngZone) {
        this.isRequired = false;
        this.resolved = new core_1.EventEmitter();
        this.expired = new core_1.EventEmitter();
        this.ngZone = _ngZone;
    }
    ngOnInit() {
        this.registerRecaptchaOnload();
        this.addRecaptchaScript();
    }
    ngOnDestroy() {
    }
    registerRecaptchaOnload() {
        window.recaptchaOnload = () => {
            const params = Object.assign({}, this.config, { 'sitekey': this.sitekey, 'callback': this.recaptchaResolved.bind(this), 'expired-callback': this.recaptchaExpired.bind(this) });
            grecaptcha.render('g-recaptcha', params);
        };
    }
    recaptchaResolved(evt) {
        this.ngZone.run(() => {
            this.resolved.emit(evt);
        });
    }
    recaptchaExpired() {
        this.ngZone.run(() => {
            this.expired.emit(true);
        });
    }
    recaptchaReset() {
        grecaptcha.reset();
    }
    addRecaptchaScript() {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
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
        styles: [`div.required {
    border: 1px solid red;
  }`]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], RecaptchaComponent);
exports.RecaptchaComponent = RecaptchaComponent;
