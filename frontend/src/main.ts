import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

<<<<<<< HEAD
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
=======



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
>>>>>>> 0617c4e0aed6e23b15a9a639ebbdedc34293c981
