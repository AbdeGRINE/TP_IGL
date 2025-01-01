import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
<<<<<<< HEAD

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
=======
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Add router provider
    provideHttpClient()
  ]
}).catch(err => console.error(err));
>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
