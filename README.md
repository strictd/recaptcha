### NGX Google Recaptcha Component

## Typescript library for implementing google recaptcha
## Compatible with Ionic2

## NGX Implementation
### NgModule Addition, import recaptcha component to declarations
```ts
import { RecaptchaComponent } from '@strictd/recaptcha';

@NgModule({
  declarations: [
    RecaptchaComponent
  ]
})
```


### Component TS / HTML Addition
```ts
@ViewChild('reCaptcha') reCaptcha: any;

recaptchaSiteKey = ''; // <-- YOU GOOGLE RECAPTCHA SITE KEY GOES HERE
gotCaptcha = false;

recaptchaResolved(got: any) {
  this.gotCaptcha = got;
}

recaptchaExpired() {
  this.gotCaptcha = false;
}

recaptchaReset() {
  if (this.recaptchaSiteKey) { this.reCaptcha.recaptchaReset(); }
}
```

```html
<recaptcha-component *ngIf="recaptchaSiteKey" #reCaptcha 
    [isRequired]="[true]" rewidth="305px" [sitekey]='recaptchaSiteKey' 
    (resolved)='recaptchaResolved($event)' (expired)='recaptchaExpired()'
></recaptcha-component>
```




## Server Side API validation
```
import { post } from 'request';

const captcaForm = {
  secret: google_captcha_secret,
  response: body.recaptcha,
  remoteip: ''
};

// Optional Remote IP address of client
try {
  captcaForm.remoteip = req.connection.remoteAddress;
} catch (e) { }

// Check Captcha
post('https://www.google.com/recaptcha/api/siteverify',
  { form: captcaForm },
  (error, response) => {
    if (!error && response.statusCode === 200) {
      // Good Validation

    } else {
      // Bad Validation

    }
  }
);
```