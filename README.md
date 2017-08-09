### NGX Google Recaptcha Component

## Typescript only library for implementing google recaptcha

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
@ViewChild('reCaptcha') reCaptcha;

recaptchaSiteKey = ''; // <-- YOU GOOGLE RECAPTCHA SITE KEY GOES HERE
gotCaptcha = false;

recaptchaResolved(got) {
  this.gotCaptcha = got;
  this.form.recaptcha = got;
}

recaptchaExpired() {
  this.gotCaptcha = false;
  this.form.recaptcha = '';
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