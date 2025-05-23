import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { AppState } from './core/store/app.state';
import { taskListReducer } from './core/store/task-list/task.reducer';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideRouterStore } from '@ngrx/router-store';
export const rebootState = (): AppState => {
  const data = localStorage.getItem('appState');
  return data ? JSON.parse(data) : { taskList: [] };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),

    provideEffects(),
    // provideRouterStore(),
    provideStore(),

    provideStore(
      { taskList: taskListReducer },
      {
        // metareducers: [localStorageMetaReducer],
        initialState: { taskList: [] },
      }
    ),
    // provideStoreDevtools(),
  ],
};

// export const rehydrateState = (): AppState => {
//   // const data = localStorage.getItem('appState');
//   return data ? JSON.parse(data) : { taskList: [] };
// };
