import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

/**
 * initialize platform that application will run in: dynamic browser
 * bootstrap AppModule to platform: Angular will look for
 * the selector of AppModule in index.html, instantiate an 
 * instance of AppComponent, and render it inside the selector tag
 */
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
