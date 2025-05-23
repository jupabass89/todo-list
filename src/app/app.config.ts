import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { taskListReducer } from './core/store/task-list/task.reducer';
import {
  getInitialState,
  localStorageReducer,
} from './shared/local-storage.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideStore(
      { taskList: taskListReducer },
      {
        metaReducers: [localStorageReducer],
        initialState: getInitialState(),
      }
    ),
  ],
};
