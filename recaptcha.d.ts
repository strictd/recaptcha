import { ElementRef, EventEmitter, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RecaptchaConfig } from './recaptcha-config';
export declare class RecaptchaComponent implements OnInit, OnDestroy {
    sitekey: string;
    config: RecaptchaConfig;
    rewidth: string;
    reheight: string;
    isRequired: boolean;
    resolved: EventEmitter<boolean>;
    expired: EventEmitter<boolean>;
    ngZone: NgZone;
    constructor(_element: ElementRef, _ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerRecaptchaOnload(): void;
    recaptchaResolved(evt: any): void;
    recaptchaExpired(): void;
    recaptchaReset(): void;
    addRecaptchaScript(): void;
}
