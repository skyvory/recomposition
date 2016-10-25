import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// import { AppComponent } from './app.component';
// import { appRouterProviders } from './app.routes';

// import { provide } from '@angular/core';
// import { FORM_PROVIDERS } from '@angular/common';
// import { Http, HTTP_PROVIDERS } from '@angular/http';
// import { AuthConfig, AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';
// import { AuthGuard } from './common/auth.guard';

// bootstrap(AppComponent, [
//     appRouterProviders,
//     HTTP_PROVIDERS,
//     AUTH_PROVIDERS,
//     AuthGuard,
// ]);

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);