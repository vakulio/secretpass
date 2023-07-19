import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { appRoutes } from './app.routes';
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    provideEnvironmentNgxMask(maskConfig),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
